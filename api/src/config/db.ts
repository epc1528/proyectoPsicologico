import mysql from 'mysql2/promise';
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
    };

const pool = mysql.createPool(connectionConfig as any);

export default pool;
