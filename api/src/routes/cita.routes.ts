import { Router } from 'express';
import { CitaController } from '../controllers/cita.controller';
import { verifyToken, verifyAdminRole, optionalToken } from '../middlewares/auth.middleware';

export const createCitaRouter = (controller: CitaController): Router => {
    const router = Router();

    // Solicitar cita (público o cliente autenticado)
    router.post('/', optionalToken, controller.solicitarCita);

    // Rutas protegidas para Administradora
    router.get('/', verifyToken, verifyAdminRole, controller.getCitasAdmin);
    router.patch('/:id/estado', verifyToken, verifyAdminRole, controller.updateEstadoCita);
    router.delete('/:id', verifyToken, verifyAdminRole, controller.deleteCita);

    return router;
};
