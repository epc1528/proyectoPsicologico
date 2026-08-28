import { apiClient } from '../../../services/api.client';

export const getUsuarios = () => apiClient('/admin/usuarios');

export const getRespuestas = () => apiClient('/admin/respuestas');

export const deleteUsuario = (id) => apiClient(`/admin/usuarios/${id}`, { method: 'DELETE' });

export const createCartilla = (data) =>
    apiClient('/admin/cartillas', {
        method: 'POST',
        body: JSON.stringify(data),
    });
