import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthPayload } from '../types/models';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret_psicocartillas_123';

/**
 * Middleware: Verifica que la petición lleve un JWT válido.
 * Agrega req.userId y req.userRole al contexto.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).json({ error: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1] ?? authHeader;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const payload = decoded as IAuthPayload;
        req.userId = payload.id;
        req.userRole = payload.role;
        next();
    });
};

/**
 * Middleware: Verifica que el usuario autenticado tenga rol 'admin'.
 * Debe usarse después de verifyToken.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.userRole !== 'admin') {
        res.status(403).json({ error: 'Require Admin Role' });
        return;
    }
    next();
};

export const verifyAdminRole = isAdmin;

/**
 * Middleware: Extrae el token si está presente, pero no bloquea si no hay token.
 */
export const optionalToken = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        next();
        return;
    }
    const token = authHeader.split(' ')[1] ?? authHeader;
    jwt.verify(token, JWT_SECRET, (_err, decoded) => {
        if (decoded) {
            const payload = decoded as IAuthPayload;
            req.userId = payload.id;
            req.userRole = payload.role;
        }
        next();
    });
};
