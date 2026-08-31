import { BaseRepository } from './base.repository';
import { IRespuesta, IRespuestaAdmin } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class RespuestaRepository extends BaseRepository {
    /**
     * Insertar o actualizar la respuesta de un usuario para un taller.
     * @returns insertId de la operación
     */
    async upsert(usuarioId: number, tallerId: number, respuesta: string, energia: number): Promise<number> {
        const result = await this.execute(
            'INSERT INTO respuestas (usuario_id, taller_id, respuesta, energia) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE respuesta = VALUES(respuesta), energia = VALUES(energia)',
            [usuarioId, tallerId, respuesta, energia]
        );
        return result.insertId;
    }

    async findByUser(usuarioId: number): Promise<IRespuesta[]> {
        return this.query<(IRespuesta & RowDataPacket)[]>(
            'SELECT * FROM respuestas WHERE usuario_id = ?',
            [usuarioId]
        );
    }

    async findAll(): Promise<IRespuestaAdmin[]> {
        return this.query<(IRespuestaAdmin & RowDataPacket)[]>(
            'SELECT r.id, r.usuario_id as userId, r.taller_id as tallerId, COALESCE(t.cartilla_id, r.taller_id) as cartillaId, r.respuesta, r.energia, r.fecha FROM respuestas r LEFT JOIN talleres t ON r.taller_id = t.id ORDER BY r.fecha DESC'
        );
    }
}
