import { Router } from 'express';
import { CompraController } from '../controllers/compra.controller';
import { verifyToken } from '../middlewares/auth.middleware';

export const createCompraRouter = (controller: CompraController): Router => {
    const router = Router();

    router.post('/', verifyToken, controller.createCompra);
    router.get('/mis-compras', verifyToken, controller.getMyCompras);

    return router;
};
