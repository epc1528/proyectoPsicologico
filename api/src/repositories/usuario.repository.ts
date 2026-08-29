import { BaseRepository } from './base.repository';
import { IUsuario, IUsuarioPublico } from '../types/models';
import { RowDataPacket } from 'mysql2/promise';

export class UsuarioRepository extends BaseRepository {
    /**
     * Buscar un usuario por correo electrónico.
     */
    async findByEmail(correo: string): Promise<IUsuario | null> {
        const rows = await this.query<(IUsuario & RowDataPacket)[]>(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );
        return rows[0] ?? null;
    }

    /**
     * Crear un nuevo usuario en la base de datos.
     * @returns ID del nuevo registro
     */
    async create(data: {
        nombre: string;
        correo: string;
        hashedPassword: string;
        telefono: string;
        fecha_nacimiento: string;
        motivo: string;
        role: 'admin' | 'user';
    }): Promise<number> {
        const result = await this.execute(
            'INSERT INTO usuarios (nombre, correo, password, telefono, fecha_nacimiento, motivo_consulta, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [data.nombre, data.correo, data.hashedPassword, data.telefono, data.fecha_nacimiento, data.motivo, data.role]
        );
        return result.insertId;
    }

    /**
     * Obtener todos los usuarios sin exponer la contraseña.
     */
    async findAll(): Promise<IUsuarioPublico[]> {
        return this.query<(IUsuarioPublico & RowDataPacket)[]>(
            'SELECT id, nombre, correo, telefono, fecha_nacimiento, motivo_consulta, role FROM usuarios'
        );
    }

    /**
     * Eliminar un usuario por ID (no puede eliminar admins).
     */
    async deleteById(id: number): Promise<void> {
        await this.execute('DELETE FROM usuarios WHERE id = ? AND role != "admin"', [id]);
    }

    /**
     * Actualizar datos de un usuario.
     */
    async update(id: number, data: Partial<IUsuarioPublico>): Promise<void> {
        const updates: string[] = [];
        const values: any[] = [];
        
        if (data.nombre !== undefined) { updates.push('nombre = ?'); values.push(data.nombre); }
        if (data.correo !== undefined) { updates.push('correo = ?'); values.push(data.correo); }
        if (data.role !== undefined) { updates.push('role = ?'); values.push(data.role); }
        if (data.telefono !== undefined) { updates.push('telefono = ?'); values.push(data.telefono); }
        if (data.motivo_consulta !== undefined) { updates.push('motivo_consulta = ?'); values.push(data.motivo_consulta); }
        
        if (updates.length === 0) return;
        
        values.push(id);
        const setClause = updates.join(', ');
        await this.execute(`UPDATE usuarios SET ${setClause} WHERE id = ?`, values);
    }
}
