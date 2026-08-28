import { apiClient } from '../../../services/api.client';

/**
 * Obtener las cartillas compradas por el usuario autenticado.
 */
export const getMisCompras = () => apiClient('/compras/mis-compras');

/**
 * Registrar la compra de una cartilla.
 */
export const comprarCartilla = (cartillaId) =>
    apiClient('/compras', {
        method: 'POST',
        body: JSON.stringify({ cartilla_id: cartillaId }),
    });
