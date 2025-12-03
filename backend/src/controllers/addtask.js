import mysql from 'mysql2/promise';
import config from '../config';
import useDB from '../config.js';
const cfg = config();

export default async function addTask(req, res) {
    const { title, description, dueto, category } = req.body;
    let connection;
    try {
        connection = await useDB();
        const insertQuery = `
            INSERT INTO tasks (title, description, dueto, category)
            VALUES (?, ?, ?, ?)
        `;
        const params = [title, description || null, dueto ? new Date(dueto) : null, category || null];
        const [result] = await connection.execute(insertQuery, params);
        res.status(201).json({ message: 'Feladat sikeresen hozzáadva', taskId: result.insertId });
    } catch (error) {
        console.error('Hiba a feladat hozzáadásakor:', error);
        res.status(500).json({ message: 'Hiba a feladat hozzáadásakor' });
    }
}