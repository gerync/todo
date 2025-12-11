import DB from '../../database/useDB.js';
import argon from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

export default async function changePasswordController(req, res) {
    const { oldPassword, newPassword } = req.body;
    const userId = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const user = await DB.useDB(
            "SELECT passwordhash FROM users WHERE id = ?",
            [userId]
        );
        if (user.length === 0) {
            conn.release();
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        const validPassword = await argon.verify(user[0].passwordhash, oldPassword);
        if (!validPassword) {
            conn.release();
            return res.status(400).json({ message: "Régi jelszó helytelen" });
        }
        const hashedNewPassword = await argon.hash(newPassword);
        const r = await DB.useDB(
            "UPDATE users SET passwordhash = ? WHERE id = ?",
            [hashedNewPassword, userId]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Jelszó módosítása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Jelszó sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}