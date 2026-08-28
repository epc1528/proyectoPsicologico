import { BaseRepository } from './base.repository';
import { ICartilla, ICartillaInput } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class CartillaRepository extends BaseRepository {
    async findAll(): Promise<ICartilla[]> {
        return this.query<(ICartilla & RowDataPacket)[]>('SELECT * FROM cartillas');
    }

    async findById(id: number): Promise<ICartilla | null> {
        const rows = await this.query<(ICartilla & RowDataPacket)[]>(
            'SELECT * FROM cartillas WHERE id = ?',
            [id]
        );
        return rows[0] ?? null;
    }

    async create(data: ICartillaInput): Promise<number> {
        const result = await this.execute(
            'INSERT INTO cartillas (titulo, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)',
            [data.titulo, data.descripcion, data.precio, data.imagen_url]
        );
        return result.insertId;
    }

    async deleteById(id: number): Promise<void> {
        await this.execute('DELETE FROM cartillas WHERE id = ?', [id]);
    }
}
