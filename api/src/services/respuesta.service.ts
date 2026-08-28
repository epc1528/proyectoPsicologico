import { RespuestaRepository } from '../repositories/respuesta.repository';
import { IRespuesta } from '../types/models';

export class RespuestaService {
    constructor(private readonly respuestaRepo: RespuestaRepository) { }

    async saveRespuesta(usuarioId: number, tallerId: number, respuesta: string, energia: number): Promise<number> {
        return this.respuestaRepo.upsert(usuarioId, tallerId, respuesta, energia);
    }

    async getMyRespuestas(usuarioId: number): Promise<IRespuesta[]> {
        return this.respuestaRepo.findByUser(usuarioId);
    }
}
