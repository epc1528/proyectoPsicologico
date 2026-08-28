import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';
import { IRegisterInput } from '../types/models';

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    register = async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: 'Los datos proporcionados son inválidos o contienen caracteres no permitidos.' });
            return;
        }

        const { nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, codigoAdmin } = req.body as IRegisterInput;
        if (!nombre || !correo || !password || !telefono || !fecha_nacimiento) {
            res.status(400).json({ error: 'Todos los campos obligatorios deben ser llenados' });
            return;
        }

        try {
            const result = await this.authService.register({ nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, codigoAdmin });
            res.json(result);
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        const { correo, password } = req.body as { correo: string; password: string };
        try {
            const result = await this.authService.login(correo, password);
            res.json(result);
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };

    forgotPassword = async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: 'Correo inválido' });
            return;
        }
        const { correo } = req.body as { correo: string };
        try {
            await this.authService.forgotPassword(correo);
            res.json({ message: 'Si el correo existe, recibirás un enlace.' });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno' });
        }
    };
}
