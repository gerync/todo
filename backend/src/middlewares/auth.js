import config from "../config.js";
import jwt from "jsonwebtoken";
import DB from "../database/useDB.js";

export default async function authMiddleware(req, res, next) {
    console.log(req.cookies.auth)
    try {
        if (!req.cookies.auth) {
            return res.status(401).json({ message: "Nincs érvényes hitelesítés" });
        }
        const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;
        if (!userid) {
            return res.status(401).json({ message: "Nincs érvényes hitelesítés" });
        }
        const query = "SELECT type FROM users WHERE id = ?";
        const result = await DB.useDB(query, [userid])
        if (result.length === 0) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        if (result[0].type === 'suspended') {
            return res.status(403).json({ message: "A felhasználói fiók felfüggesztésre került" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Nincs érvényes hitelesítés" });
    }
}