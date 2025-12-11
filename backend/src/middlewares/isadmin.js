import jwt from "jsonwebtoken";
import config from "../config.js";
import DB from "../database/useDB.js";

export default async function isAdmin(req, res, next) {
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;
    try {
        const user = await DB.useDB(
            "SELECT type FROM users WHERE id = ?",
            [userid]
        );
        if (user.length === 0 ) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        if (user[0].type !== 'admin') {
            return res.status(403).json({ message: "Nincs jogosultságod ehhez a művelethez" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}