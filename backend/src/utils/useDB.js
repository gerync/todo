import mysql from 'mysql2/promise';
import config from './config.js';

const cfg = config();

async function DBsetup() {
    const pool = mysql.createPool({
        host: cfg.dbHost,
        user: cfg.dbUser,
        password: cfg.dbPassword,
        database: cfg.dbName,
        connectionLimit: 10
    });
    return pool.getConnection();
}
export default async function useDB(query, params) {
    const connection = await DBsetup();
    const [ results ] = await connection.query(query, params);
    connection.release();
    return results;
}