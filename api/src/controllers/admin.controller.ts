import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { ICartillaInput, IUsuarioPublico } from '../types/models';
import { catchAsync } from '../utils/catchAsync';

export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    getUsuarios = catchAsync(async (_req: Request, res: Response) => {
        const usuarios = await this.adminService.getUsuarios();
        res.json(usuarios);
    });

    deleteUsuario = catchAsync(async (req: Request, res: Response) => {
        await this.adminService.deleteUsuario(Number(req.params.id));
        res.json({ message: 'Usuario eliminado' });
    });

    updateUsuario = catchAsync(async (req: Request, res: Response) => {
        const data = req.body as Partial<IUsuarioPublico>;
        await this.adminService.updateUsuario(Number(req.params.id), data);
        res.json({ message: 'Usuario actualizado correctamente' });
    });

    getRespuestas = catchAsync(async (_req: Request, res: Response) => {
        const respuestas = await this.adminService.getRespuestas();
        res.json(respuestas);
    });

    createCartilla = catchAsync(async (req: Request, res: Response) => {
        const data = req.body as ICartillaInput;
        const id = await this.adminService.createCartilla(data);
        res.json({ message: 'Cartilla creada', id });
    });

    updateCartilla = catchAsync(async (req: Request, res: Response) => {
        const data = req.body as Partial<ICartillaInput>;
        await this.adminService.updateCartilla(Number(req.params.id), data);
        res.json({ message: 'Cartilla actualizada correctamente' });
    });

    deleteCartilla = catchAsync(async (req: Request, res: Response) => {
        await this.adminService.deleteCartilla(Number(req.params.id));
        res.json({ message: 'Cartilla eliminada' });
    });
}
