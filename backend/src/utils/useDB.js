import mysql from 'mysql2/promise';
import config from './config.js';

const cfg = config();

async function DBsetup() {
    const pool = mysql.createPool({
        host: cfg.db.user,
        user: cfg.db.user,
        password: cfg.db.password,
        database: cfg.db.database,
        connectionLimit: 10,
        port: cfg.db.port
    });
    return pool.getConnection();
}
export default async function useDB(query, params) {
    const connection = await DBsetup();
    const [ results ] = await connection.query(query, params);
    connection.release();
    return results;
}