import pool from '../config/db';
import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

/**
 * Clase base abstracta para todos los repositories.
 * Centraliza el acceso al pool de conexiones MySQL.
 */
export abstract class BaseRepository {
    protected readonly db: Pool;

    constructor() {
        this.db = pool;
    }

    /**
     * Ejecuta una query SELECT y devuelve las filas como tipo T.
     */
    protected async query<T extends RowDataPacket[]>(
        sql: string,
        params?: unknown[]
    ): Promise<T> {
        const [rows] = await this.db.query<T>(sql, params);
        return rows;
    }

    /**
     * Ejecuta una operación de escritura (INSERT, UPDATE, DELETE).
     * @returns ResultSetHeader con insertId, affectedRows, etc.
     */
    protected async execute(
        sql: string,
        params?: unknown[]
    ): Promise<ResultSetHeader> {
        const [result] = await this.db.query<ResultSetHeader>(sql, params);
        return result;
    }
}
