import { apiClient } from '../../../services/api.client';

/**
 * Iniciar sesión con correo y contraseña.
 */
export const login = (correo, password) =>
    apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ correo, password }),
    });

/**
 * Registrar un nuevo usuario.
 */
export const register = (datos) =>
    apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(datos),
    });

/**
 * Solicitar recuperación de contraseña.
 */
export const forgotPassword = (correo) =>
    apiClient('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ correo }),
    });

/**
 * Restablecer contraseña con token.
 */
export const resetPassword = (token, password) =>
    apiClient('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
    });
