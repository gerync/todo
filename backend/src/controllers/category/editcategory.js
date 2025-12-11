import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function editCategoryController(req, res) {
    const { categoryid, name, description } = req.body;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;
    const conn = await DB.pool.getConnection();
    try {
        const existing = await DB.useDB(
            "SELECT id FROM categories WHERE id = ? AND userid = ?",
            [categoryid, userid]
        );
        if (existing.length === 0) {
            conn.release();
            return res.status(404).json({ message: "Kategória nem található" });
        }

        if (name) {
            const duplicate = await DB.useDB(
                "SELECT id FROM categories WHERE name = ? AND userid = ? AND id != ?",
                [name, userid, categoryid]
            );
            if (duplicate.length > 0) {
                conn.release();
                return res.status(400).json({ message: "Már létezik ilyen nevű kategória" });
            }
        }

        const changes = [];
        const params = [];
        if (name !== undefined) {
            changes.push("name = ?");
            params.push(name);
        }
        if (description !== undefined) {
            changes.push("description = ?");
            params.push(description || null);
        }
        params.push(categoryid, userid);
        const result = await DB.useDB(
            `UPDATE categories SET ${changes.join(", ")} WHERE id = ? AND userid = ?`,
            params
        );
        if (result.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Kategória módosítása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Kategória sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}
