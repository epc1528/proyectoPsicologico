import { Request, Response } from 'express';
import { CartillaService } from '../services/cartilla.service';
import { AdminService } from '../services/admin.service';

export class CartillaController {
    constructor(
        private readonly cartillaService: CartillaService,
        private readonly adminService: AdminService
    ) { }

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const cartillas = await this.cartillaService.getAll();
            res.json(cartillas);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const cartilla = await this.cartillaService.getById(Number(req.params.id));
            res.json(cartilla);
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };

    getTalleres = async (req: Request, res: Response): Promise<void> => {
        try {
            const talleres = await this.adminService.getTalleresByCartilla(
                Number(req.params.id),
                req.userId!,
                req.userRole!
            );
            res.json(talleres);
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };
}
