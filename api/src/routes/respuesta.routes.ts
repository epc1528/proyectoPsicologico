import { Router } from 'express';
import { RespuestaController } from '../controllers/respuesta.controller';
import { verifyToken } from '../middlewares/auth.middleware';

export const createRespuestaRouter = (controller: RespuestaController): Router => {
    const router = Router();

    router.post('/', verifyToken, controller.saveRespuesta);
    router.get('/mis-respuestas', verifyToken, controller.getMyRespuestas);

    return router;
};
