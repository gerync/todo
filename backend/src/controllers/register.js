import useDB from '../utils/useDB.js';
import argon2 from 'argon2';

export default async function registerUser(req, res) {
    const { username, password, birthdate, email } = req.body;
    try {
        const hashedPassword = await argon2.hash(password);

        const connection = await useDB();
        const [result] = await connection.execute(
            'INSERT INTO users (username, passwordhash, birthdate, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, birthdate, email]
        );
        await connection.end();

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}