// URL base del backend
const BASE_URL = 'http://localhost:5000/api';

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
        throw new Error(data.error || 'Error en la petición');
    }

    return data;
};

export default BASE_URL;
