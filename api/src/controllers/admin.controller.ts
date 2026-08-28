import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { ICartillaInput } from '../types/models';

export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    getUsuarios = async (_req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await this.adminService.getUsuarios();
            res.json(usuarios);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    deleteUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.adminService.deleteUsuario(Number(req.params.id));
            res.json({ message: 'Usuario eliminado' });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno' });
        }
    };

    getRespuestas = async (_req: Request, res: Response): Promise<void> => {
        try {
            const respuestas = await this.adminService.getRespuestas();
            res.json(respuestas);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    createCartilla = async (req: Request, res: Response): Promise<void> => {
        const data = req.body as ICartillaInput;
        try {
            const id = await this.adminService.createCartilla(data);
            res.json({ message: 'Cartilla creada', id });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    deleteCartilla = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.adminService.deleteCartilla(Number(req.params.id));
            res.json({ message: 'Cartilla eliminada' });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno' });
        }
    };
}
