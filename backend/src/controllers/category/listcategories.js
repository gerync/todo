import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function listCategoriesController(req, res) {
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const categories = await DB.useDB(
            "SELECT * FROM categories WHERE userid = ?",
            [userid]
        );
        conn.release();
        if (categories.length === 0) {
            return res.status(404).json({ message: "Nincsenek kategóriák" });
        }
        return res.status(200).json({ categories });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}