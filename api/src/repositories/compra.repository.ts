import { BaseRepository } from './base.repository';
import { ICartilla } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class CompraRepository extends BaseRepository {
    /**
     * Verifica si un usuario ya adquirió una cartilla específica.
     */
    async existsByUserAndCartilla(usuarioId: number, cartillaId: number): Promise<boolean> {
        const rows = await this.query<RowDataPacket[]>(
            'SELECT 1 FROM compras WHERE usuario_id = ? AND cartilla_id = ?',
            [usuarioId, cartillaId]
        );
        return rows.length > 0;
    }

    /**
     * Registrar una nueva compra.
     */
    async create(usuarioId: number, cartillaId: number): Promise<void> {
        await this.execute(
            'INSERT INTO compras (usuario_id, cartilla_id) VALUES (?, ?)',
            [usuarioId, cartillaId]
        );
    }

    /**
     * Obtener las cartillas compradas por un usuario.
     */
    async findCartillasByUser(usuarioId: number): Promise<ICartilla[]> {
        return this.query<(ICartilla & RowDataPacket)[]>(
            'SELECT c.* FROM compras co JOIN cartillas c ON co.cartilla_id = c.id WHERE co.usuario_id = ?',
            [usuarioId]
        );
    }
}
