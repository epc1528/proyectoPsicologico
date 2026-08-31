import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Transporter } from 'nodemailer';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { IAuthResult, IRegisterInput } from '../types/models';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret_psicocartillas_123';
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY ?? '2409@';
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

export class AuthService {
    constructor(
        private readonly userRepo: UsuarioRepository,
        private readonly mailer: Transporter
    ) { }

    async register(input: IRegisterInput): Promise<IAuthResult> {
        if (!PASSWORD_REGEX.test(input.password)) {
            const err = new Error('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número.');
            (err as any).statusCode = 400;
            throw err;
        }

        const existing = await this.userRepo.findByEmail(input.correo);
        if (existing) {
            const err = new Error('El correo ya está registrado');
            (err as any).statusCode = 400;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        const motivo = input.motivo_consulta ?? 'No especificado';
        const role: 'admin' | 'user' = input.codigoAdmin === ADMIN_SECRET ? 'admin' : 'user';

        const id = await this.userRepo.create({
            nombre: input.nombre,
            correo: input.correo,
            hashedPassword,
            telefono: input.telefono,
            fecha_nacimiento: input.fecha_nacimiento,
            motivo,
            role,
        });

        const token = jwt.sign({ id, correo: input.correo, role }, JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id, nombre: input.nombre, correo: input.correo, role } };
    }

    async login(correo: string, password: string): Promise<IAuthResult> {
        const user = await this.userRepo.findByEmail(correo);
        if (!user) {
            const err = new Error('Credenciales inválidas');
            (err as any).statusCode = 401;
            throw err;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const err = new Error('Credenciales inválidas');
            (err as any).statusCode = 401;
            throw err;
        }

        const token = jwt.sign({ id: user.id, correo: user.correo, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        return { token, user: { id: user.id, nombre: user.nombre, correo: user.correo, role: user.role } };
    }

    async forgotPassword(correo: string): Promise<void> {
        const user = await this.userRepo.findByEmail(correo);
        if (!user) return; // Respuesta silenciosa por seguridad

        const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: `"PsicoCartillas" <${process.env.EMAIL_USER}>`,
            to: correo,
            subject: 'Recuperación de Contraseña - PsicoCartillas',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #312e81; text-align: center;">Recuperación de Acceso</h2>
          <p style="color: #475569; font-size: 16px;">Hola <b>${user.nombre}</b>,</p>
          <p style="color: #475569; font-size: 16px;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en PsicoCartillas.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Restablecer mi contraseña</a>
          </div>
          <p style="color: #475569; font-size: 14px;">Este enlace expirará en 15 minutos por tu seguridad.</p>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 40px; text-align: center;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
      `,
        };

        if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'tu_contraseña_de_aplicacion') {
            await this.mailer.sendMail(mailOptions);
            console.log(`📧 Correo real enviado a: ${correo}`);
        } else {
            console.log('----------------------------------------------------');
            console.log(`📧 [MODO PRUEBA] Correo simulado a: ${correo}`);
            console.log(`🔗 Enlace de recuperación: ${resetLink}`);
            console.log('⚠️  Añade tu contraseña de Gmail en el archivo .env para enviar correos reales');
            console.log('----------------------------------------------------');
        }
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        if (!PASSWORD_REGEX.test(newPassword)) {
            const err = new Error('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número.');
            (err as any).statusCode = 400;
            throw err;
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch {
            const err = new Error('El enlace de recuperación es inválido o ha expirado.');
            (err as any).statusCode = 400;
            throw err;
        }

        const userId = decoded.id;
        const user = await this.userRepo.findById(userId);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            (err as any).statusCode = 404;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepo.updatePassword(userId, hashedPassword);
    }
}
