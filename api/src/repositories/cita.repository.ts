import { BaseRepository } from './base.repository';
import { ICita, ICitaInput } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class CitaRepository extends BaseRepository {
    async create(usuarioId: number | null, data: ICitaInput): Promise<number> {
        const result = await this.execute(
            `INSERT INTO citas (usuario_id, nombre_cliente, correo_cliente, telefono_cliente, especialidad, fecha_cita, hora_cita, motivo, estado)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'PENDIENTE')`,
            [
                usuarioId,
                data.nombre_cliente,
                data.correo_cliente,
                data.telefono_cliente,
                data.especialidad,
                data.fecha_cita,
                data.hora_cita,
                data.motivo || ''
            ]
        );
        return result.insertId;
    }

    async findAll(): Promise<ICita[]> {
        return this.query<(ICita & RowDataPacket)[]>(
            `SELECT id, usuario_id, nombre_cliente, correo_cliente, telefono_cliente, especialidad,
                    DATE_FORMAT(fecha_cita, '%Y-%m-%d') as fecha_cita, hora_cita, motivo, estado, fecha_creacion
             FROM citas
             ORDER BY fecha_creacion DESC`
        );
    }

    async updateEstado(id: number, estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'): Promise<void> {
        await this.execute('UPDATE citas SET estado = ? WHERE id = ?', [estado, id]);
    }

    async findById(id: number): Promise<ICita | null> {
        const rows = await this.query<(ICita & RowDataPacket)[]>(
            `SELECT id, usuario_id, nombre_cliente, correo_cliente, telefono_cliente, especialidad,
                    DATE_FORMAT(fecha_cita, '%Y-%m-%d') as fecha_cita, hora_cita, motivo, estado, fecha_creacion
             FROM citas WHERE id = ?`,
            [id]
        );
        return rows[0] ?? null;
    }

    async deleteById(id: number): Promise<void> {
        await this.execute('DELETE FROM citas WHERE id = ?', [id]);
    }
}
