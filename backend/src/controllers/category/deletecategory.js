import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function deleteCategoryController(req, res) {
    const { categoryid } = req.query;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;
    const conn = await DB.pool.getConnection();
    try {
        const result = await DB.useDB(
            "DELETE FROM categories WHERE id = ? AND userid = ?",
            [categoryid, userid]
        );
        if (result.affectedRows === 0) {
            conn.release();
            return res.status(404).json({ message: "Kategória nem található" });
        }
        conn.release();
        return res.status(200).json({ message: "Kategória sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}
