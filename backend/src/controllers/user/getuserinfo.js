import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function getUserInfoController(req, res) {
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const userInfo = await DB.useDB(
            "SELECT id, username, email, createdat FROM users WHERE id = ?",
            [userid]
        );
        conn.release();
        if (userInfo.length === 0) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        return res.status(200).json({ user: userInfo[0] });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}