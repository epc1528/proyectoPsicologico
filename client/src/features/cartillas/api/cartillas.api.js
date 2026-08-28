import { apiClient } from '../../../services/api.client';

/**
 * Obtener todas las cartillas disponibles.
 */
export const getCartillas = () => apiClient('/cartillas');

/**
 * Obtener una cartilla por ID.
 */
export const getCartillaById = (id) => apiClient(`/cartillas/${id}`);

/**
 * Obtener los talleres de una cartilla (requiere autenticación).
 */
export const getTalleresByCartilla = (id) => apiClient(`/cartillas/${id}/talleres`);
