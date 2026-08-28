import { Request, Response } from 'express';
import { CompraService } from '../services/compra.service';

export class CompraController {
    constructor(private readonly compraService: CompraService) { }

    createCompra = async (req: Request, res: Response): Promise<void> => {
        const { cartilla_id } = req.body as { cartilla_id: number };
        try {
            await this.compraService.createCompra(req.userId!, cartilla_id);
            res.json({ message: 'Compra registrada con éxito' });
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };

    getMyCompras = async (req: Request, res: Response): Promise<void> => {
        try {
            const compras = await this.compraService.getMyCompras(req.userId!, req.userRole!);
            res.json(compras);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}
