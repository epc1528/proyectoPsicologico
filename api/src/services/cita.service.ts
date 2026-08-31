import { CitaRepository } from '../repositories/cita.repository';
import { ICita, ICitaInput } from '../types/models';
import { Transporter } from 'nodemailer';
import transporter from '../config/mailer';

export class CitaService {
    constructor(
        private readonly citaRepo: CitaRepository,
        private readonly mailer: Transporter = transporter
    ) { }

    async solicitarCita(usuarioId: number | null, data: ICitaInput): Promise<number> {
        if (!data.nombre_cliente || !data.correo_cliente || !data.telefono_cliente || !data.especialidad || !data.fecha_cita) {
            const err = new Error('Todos los campos obligatorios deben ser completados');
            (err as any).statusCode = 400;
            throw err;
        }
        return this.citaRepo.create(usuarioId, data);
    }

    async getTodasLasCitas(): Promise<ICita[]> {
        return this.citaRepo.findAll();
    }

    async cambiarEstadoCita(id: number, estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'): Promise<void> {
        await this.citaRepo.updateEstado(id, estado);
    }

    async eliminarCita(id: number): Promise<void> {
        await this.citaRepo.deleteById(id);
    }

    async enviarCorreoCliente(id: number, asunto: string, mensaje: string): Promise<void> {
        const cita = await this.citaRepo.findById(id);
        if (!cita) {
            const err = new Error('Cita médica no encontrada');
            (err as any).statusCode = 404;
            throw err;
        }

        const mailOptions = {
            from: `"Equipo Médico PsicoCartillas" <${process.env.EMAIL_USER || 'soporte@psicocartillas.com'}>`,
            to: cita.correo_cliente,
            subject: asunto || `Respuesta a tu cita médica - ${cita.especialidad}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 16px;">
                    <div style="background-color: #be123c; color: white; padding: 16px; text-align: center; border-radius: 12px 12px 0 0;">
                        <h2 style="margin: 0;">PsicoCartillas • Servicio Médico</h2>
                    </div>
                    <div style="padding: 20px; color: #334155;">
                        <p>Hola <b>${cita.nombre_cliente}</b>,</p>
                        <p>Te contactamos con respecto a tu solicitud de cita médica para la especialidad <b>${cita.especialidad}</b> (Fecha deseada: ${cita.fecha_cita} - ${cita.hora_cita}).</p>
                        <div style="background-color: #fff1f2; border-left: 4px solid #be123c; padding: 16px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${mensaje}</p>
                        </div>
                        <p style="font-size: 14px; color: #64748b;">Si tienes dudas adicionales, puedes responder directamente a este correo o contactarnos por nuestros canales oficiales.</p>
                    </div>
                    <div style="text-align: center; font-size: 12px; color: #94a3b8; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                        PsicoCartillas © ${new Date().getFullYear()} • Salud Mental & Bienestar Integral
                    </div>
                </div>
            `,
        };

        if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'tu_contraseña_de_aplicacion') {
            await this.mailer.sendMail(mailOptions);
            console.log(`📧 Correo enviado al paciente: ${cita.correo_cliente}`);
        } else {
            console.log('----------------------------------------------------');
            console.log(`📧 [MODO PRUEBA] Correo al paciente: ${cita.correo_cliente}`);
            console.log(`Asunto: ${asunto}`);
            console.log(`Mensaje: ${mensaje}`);
            console.log('----------------------------------------------------');
        }
    }
}
