import useDB from '../utils/useDB.js';
import argon2 from 'argon2';
import crypto from 'crypto';

export default async function loginUser(req, res) {
    const { userinfo, password } = req.body;
    try {
        const query = 'SELECT id, username, passwordhash, type FROM users WHERE username = ? OR email = ?';
        const params = [userinfo, userinfo];
        const rows = await useDB(query, params);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Helytelen felhasználói adat vagy jelszó' });
        }

        const user = rows[0];
        const passwordMatch = await argon2.verify(user.password, password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Helytelen felhasználói adat vagy jelszó' });
        }
        const sessionToken = crypto.randomBytes(64).toString('hex');
        const insertSessionQuery = 'INSERT INTO sessions (userid, sessiontoken, expiresat) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))';
        await useDB(insertSessionQuery, [user.id, sessionToken]);
        res.cookie('authToken', sessionToken, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Sikeres belépés', userId: user.id, username: user.username, type: user.type });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Szerveroldali hiba' });
    }
}