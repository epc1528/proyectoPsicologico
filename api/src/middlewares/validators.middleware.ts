import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Función genérica para manejar el resultado de express-validator
export const validateResult = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
    }
    next();
};

export const createCartillaValidator = [
    body('titulo').isString().notEmpty().withMessage('El título es requerido'),
    body('descripcion').isString().notEmpty().withMessage('La descripción es requerida'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('activo').isBoolean().optional(),
    validateResult
];

export const updateCartillaValidator = [
    body('titulo').isString().optional(),
    body('descripcion').isString().optional(),
    body('precio').isNumeric().optional(),
    body('activo').isBoolean().optional(),
    validateResult
];
