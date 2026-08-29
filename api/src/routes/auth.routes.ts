import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { AuthController } from '../controllers/auth.controller';

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Demasiados intentos desde esta IP, por favor intenta de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

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

    return router;
};
