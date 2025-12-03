import mysql from 'mysql2/promise';
import config from '../config.js';

const cfg = config();

async function DBsetup() {
    const connection = await mysql.createConnection({
        host: cfg.db.host,
        port: cfg.db.port,
        user: cfg.db.user,
        password: cfg.db.password,
        database: cfg.db.database
    });
    return connection;
}
export default async function useDB(query, params) {
    const connection = await DBsetup();
    const [results] = await connection.execute(query, params);
    await connection.end();
    return results;
}