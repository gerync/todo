import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function changeInfoController(req, res) {
    const { username, email, birhdate } = req.body;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const userExists = await DB.useDB(
            "SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?",
            [username, email, userid]
        );
        if (userExists.length > 0) {
            conn.release();
            return res.status(400).json({ message: "A felhasználónév vagy email cím már foglalt" });
        }
        const changes = [];
        const params = [];
        if (username) {
            changes.push("username = ?");
            params.push(username);
        }
        if (email) {
            changes.push("email = ?");
            params.push(email);
        }
        if (birhdate) {
            changes.push("birthdate = ?");
            params.push(birhdate);
        }
        if (changes.length === 0) {
            conn.release();
            return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
        }
        params.push(userid);
        const r = await DB.useDB(
            `UPDATE users SET ${changes.join(", ")} WHERE id = ?`,
            params
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Adatok módosítása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Adatok sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}