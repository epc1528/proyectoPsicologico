// URL base del backend (usa variable de entorno en producción o localhost en desarrollo)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Retorna los headers con token de autorización si el usuario está logueado.
 */
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

/**
 * Cliente HTTP base. Lanza un error si la respuesta no es OK.
 */
export const apiClient = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: getAuthHeaders(),
        ...options,
    });

    const data = await response.json();

    if (!response.ok) {
        // Interceptor global para token expirado / no autorizado
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Forzar redirección
        }
        throw new Error(data.error || data.message || 'Error en la petición');
    }

    return data;
};

export default BASE_URL;
