import useDB from '../database/useDB.js';
import argon2 from 'argon2';

export default async function loginUser(req, res) {
    const { userinfo, password } = req.body;
    try {
        const connection = await useDB();
        const [rows] = await connection.execute(
            'SELECT id, username, password FROM users WHERE username = ? OR email = ?',
            [userinfo, userinfo]
        );

        if (rows.length === 0) {
            await connection.end();
            return res.status(401).json({ message: 'Helytelen felhasználói adat vagy jelszó' });
        }

        const user = rows[0];
        const passwordMatch = await argon2.verify(user.password, password);

        if (!passwordMatch) {
            await connection.end();
            return res.status(401).json({ message: 'Helytelen felhasználói adat vagy jelszó' });
        }

        await connection.end();
        res.status(200).json({ message: 'Sikeres belépés', userId: user.id, username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Szerveroldali hiba' });
    }
}