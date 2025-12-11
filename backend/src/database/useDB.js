import mysql from 'mysql2/promise';
import config from '../config.js';

export const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    port: config.db.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function useDB(sql, params) {
    const [result] = await pool.query(sql, params);
    return result;
}

export default { pool, useDB };