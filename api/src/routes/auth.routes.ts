import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/auth.controller';

export const createAuthRouter = (controller: AuthController): Router => {
    const router = Router();

    router.post(
        '/register',
        [
            body('nombre').trim().isLength({ min: 2, max: 50 }).escape(),
            body('correo').isEmail().normalizeEmail(),
            body('telefono').trim().isLength({ min: 7, max: 15 }).escape(),
        ],
        controller.register
    );

    router.post('/login', controller.login);

    router.post(
        '/forgot-password',
        [body('correo').isEmail().normalizeEmail()],
        controller.forgotPassword
    );

    router.post(
        '/reset-password',
        [
            body('token').notEmpty().withMessage('Token requerido'),
            body('password').notEmpty().withMessage('Contraseña requerida')
        ],
        controller.resetPassword
    );

    return router;
};
