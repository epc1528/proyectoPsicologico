import { apiClient } from '../../../services/api.client';

export const solicitarCita = async (citaData) => {
    return apiClient('/citas', {
        method: 'POST',
        body: JSON.stringify(citaData)
    });
};

export const getCitasAdmin = async () => {
    return apiClient('/citas');
};

export const updateEstadoCita = async (id, estado) => {
    return apiClient(`/citas/${id}/estado`, {
        method: 'PATCH',
        body: JSON.stringify({ estado })
    });
};

export const deleteCita = async (id) => {
    return apiClient(`/citas/${id}`, {
        method: 'DELETE'
    });
};

export const enviarCorreoCita = async (id, { asunto, mensaje }) => {
    return apiClient(`/citas/${id}/enviar-correo`, {
        method: 'POST',
        body: JSON.stringify({ asunto, mensaje })
    });
};
