import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function deleteAccountController(req, res) {
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            "DELETE FROM users WHERE id = ?",
            [userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Felhasználó törlése sikertelen" });
        }
        conn.release();
        res.clearCookie("auth");
        return res.status(200).json({ message: "Felhasználó sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}