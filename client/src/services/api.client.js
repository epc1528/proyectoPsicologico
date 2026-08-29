// Determinar URL base según el entorno (desarrollo vs producción en Railway)
const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return 'http://localhost:5000/api';
    }
    return 'https://stellar-vision-production.up.railway.app/api';
};

const BASE_URL = getBaseUrl();

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

    let data = {};
    const text = await response.text();
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { error: text };
        }
    }

    if (!response.ok) {
        // Interceptor global para token expirado (excepto si estamos en el proceso de login)
        if (response.status === 401 && !endpoint.includes('/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        const errorMsg = data.error || data.message || `Error ${response.status}: ${response.statusText || 'de conexión'}`;
        throw new Error(errorMsg);
    }

    return data;
};

export default BASE_URL;
