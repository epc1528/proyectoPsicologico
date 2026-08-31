import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Soporta Railway (MYSQL_URL / DATABASE_URL) o variables individuales (MYSQLHOST / DB_HOST)
const connectionConfig = process.env.MYSQL_URL || process.env.DATABASE_URL
    ? (process.env.MYSQL_URL || process.env.DATABASE_URL)!
    : {
        host: process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1',
        user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'rootpassword',
        database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'cartillas_psicologicas',
        port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || (process.env.DB_HOST === 'db' ? 3306 : 3307),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
    };

const targetHost = typeof connectionConfig === 'string' ? 'URL (DATABASE_URL / MYSQL_URL)' : (connectionConfig.host || 'localhost');
console.log(`🔌 Conectando a MySQL en: ${targetHost}`);

const pool = mysql.createPool(
    typeof connectionConfig === 'string'
        ? { uri: connectionConfig, multipleStatements: true }
        : connectionConfig as any
);

function findFilePath(filename: string): string | null {
    const candidates = [
        path.join(__dirname, '../../', filename),
        path.join(__dirname, '../', filename),
        path.join(process.cwd(), filename),
        path.join(process.cwd(), 'api', filename),
    ];
    for (const c of candidates) {
        if (fs.existsSync(c)) return c;
    }
    return null;
}

/**
 * Auto-inicializador de esquema y datos semilla (Auto-Migration)
 */
export async function initializeDatabase(): Promise<void> {
    try {
        console.log('🔄 Conectando e inicializando base de datos MySQL...');
        const connection = await pool.getConnection();

        // 1. Cargar esquema SQL
        const schemaPath = findFilePath('schema.sql');
        if (schemaPath) {
            try {
                const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
                await connection.query(schemaSql);
                console.log('✅ Esquema de base de datos verificado con éxito.');
            } catch (sErr: any) {
                console.warn('⚠️ Nota al ejecutar schema.sql:', sErr.message);
            }
        }

        // Garantizar existencia de la tabla citas
        try {
            await connection.query(`
                CREATE TABLE IF NOT EXISTS citas (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  usuario_id INT NULL,
                  nombre_cliente VARCHAR(100) NOT NULL,
                  correo_cliente VARCHAR(100) NOT NULL,
                  telefono_cliente VARCHAR(20) NOT NULL,
                  especialidad VARCHAR(100) NOT NULL,
                  fecha_cita DATE NOT NULL,
                  hora_cita VARCHAR(50) NOT NULL,
                  motivo TEXT,
                  estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA') DEFAULT 'PENDIENTE',
                  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
                );
            `);
        } catch (cErr: any) {
            console.warn('⚠️ Nota al verificar la tabla citas:', cErr.message);
        }

        // 2. Verificar e insertar datos de prueba (Seed SQL)
        try {
            const [users] = await connection.query<any[]>('SELECT COUNT(*) as count FROM usuarios');
            if (users && users[0] && Number(users[0].count) === 0) {
                const seedPath = findFilePath('seed.sql');
                if (seedPath) {
                    const seedSql = fs.readFileSync(seedPath, 'utf-8');
                    await connection.query(seedSql);
                    console.log('🌱 Datos iniciales (Seed SQL) insertados con éxito.');
                }
            }
        } catch (seedErr: any) {
            console.warn('⚠️ Nota al verificar/ejecutar seed.sql:', seedErr.message);
        }

        connection.release();
    } catch (err: any) {
        console.error('⚠️ Conexión inicial a MySQL falló, la API continuará intentándolo:', err.message);
    }
}

export default pool;
