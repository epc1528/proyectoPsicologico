import { BaseRepository } from './base.repository';
import { ITaller } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class TallerRepository extends BaseRepository {
    async findByCartilla(cartillaId: number): Promise<ITaller[]> {
        return this.query<(ITaller & RowDataPacket)[]>(
            'SELECT * FROM talleres WHERE cartilla_id = ?',
            [cartillaId]
        );
    }
}
