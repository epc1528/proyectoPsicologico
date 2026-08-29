import { CitaRepository } from '../repositories/cita.repository';
import { ICita, ICitaInput } from '../types/models';

export class CitaService {
    constructor(private readonly citaRepo: CitaRepository) { }

    async solicitarCita(usuarioId: number | null, data: ICitaInput): Promise<number> {
        if (!data.nombre_cliente || !data.correo_cliente || !data.telefono_cliente || !data.especialidad || !data.fecha_cita) {
            const err = new Error('Todos los campos obligatorios deben ser completados');
            (err as any).statusCode = 400;
            throw err;
        }
        return this.citaRepo.create(usuarioId, data);
    }

    async getTodasLasCitas(): Promise<ICita[]> {
        return this.citaRepo.findAll();
    }

    async cambiarEstadoCita(id: number, estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'): Promise<void> {
        await this.citaRepo.updateEstado(id, estado);
    }

    async eliminarCita(id: number): Promise<void> {
        await this.citaRepo.deleteById(id);
    }
}
