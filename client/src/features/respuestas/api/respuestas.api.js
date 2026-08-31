import { apiClient } from '../../../services/api.client';

export const getMisRespuestas = () => apiClient('/respuestas/mis-respuestas');

export const saveRespuesta = (payload) =>
    apiClient('/respuestas', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
