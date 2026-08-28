import { Router } from 'express';
import { CartillaController } from '../controllers/cartilla.controller';
import { verifyToken } from '../middlewares/auth.middleware';

export const createCartillaRouter = (controller: CartillaController): Router => {
    const router = Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.get('/:id/talleres', verifyToken, controller.getTalleres);

    return router;
};
