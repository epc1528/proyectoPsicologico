import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware';

export const createAdminRouter = (controller: AdminController): Router => {
    const router = Router();

    // Todos los endpoints requieren autenticación y rol admin
    router.use(verifyToken, isAdmin);

    router.get('/usuarios', controller.getUsuarios);
    router.delete('/usuarios/:id', controller.deleteUsuario);
    router.get('/respuestas', controller.getRespuestas);
    router.post('/cartillas', controller.createCartilla);
    router.delete('/cartillas/:id', controller.deleteCartilla);

    return router;
};
