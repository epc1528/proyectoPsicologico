import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Soporta Railway (MYSQL_URL / DATABASE_URL) o variables individuales (MYSQLHOST / DB_HOST)
const connectionConfig = process.env.MYSQL_URL || process.env.DATABASE_URL
    ? (process.env.MYSQL_URL || process.env.DATABASE_URL)!
    : {
        host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
        user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
        password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
        database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'cartillas_psicologicas',
        port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true, // Permitir múltiples queries para el seed
    };

const targetHost = typeof connectionConfig === 'string' ? 'URL (DATABASE_URL / MYSQL_URL)' : (connectionConfig.host || 'localhost');
console.log(`🔌 Conectando a MySQL en: ${targetHost}`);

const pool = mysql.createPool(
    typeof connectionConfig === 'string'
        ? { uri: connectionConfig, multipleStatements: true }
        : connectionConfig as any
);

/**
 * Auto-inicializador de esquema y datos semilla (Auto-Migration)
 */
export async function initializeDatabase(): Promise<void> {
    let retries = 5;
    while (retries > 0) {
        try {
            console.log('🔄 Verificando esquema de la base de datos...');
            const connection = await pool.getConnection();

            // 1. Cargar esquema SQL si existe
            const schemaPath = path.join(__dirname, '../../schema.sql');
            if (fs.existsSync(schemaPath)) {
                const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
                await connection.query(schemaSql);
                console.log('✅ Esquema SQL verificado / creado con éxito.');
            }

            // 2. Verificar si la tabla usuarios está vacía para correr el seed
            const [users] = await connection.query<any[]>('SELECT COUNT(*) as count FROM usuarios');
            if (users && users[0] && users[0].count === 0) {
                const seedPath = path.join(__dirname, '../../seed.sql');
                if (fs.existsSync(seedPath)) {
                    const seedSql = fs.readFileSync(seedPath, 'utf-8');
                    await connection.query(seedSql);
                    console.log('🌱 Datos de prueba (Seed SQL) insertados con éxito.');
                }
            }

            connection.release();
            break;
        } catch (err: any) {
            retries--;
            console.warn(`⚠️ Intento de conexión a MySQL falló (${err.message}). Reintentando en 3s... (${retries} reintentos restantes)`);
            if (retries === 0) {
                console.error('❌ No se pudo inicializar la base de datos:', err.message);
            } else {
                await new Promise((res) => setTimeout(res, 3000));
            }
        }
    }
}

export default pool;
