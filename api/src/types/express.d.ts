import { Request } from 'express';

// Ampliar la interfaz de Request de Express para incluir datos del JWT
declare global {
    namespace Express {
        interface Request {
            userId?: number;
            userRole?: 'admin' | 'user';
        }
    }
}

export { };
