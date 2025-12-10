import DB from "../database/useDB.js";

export default async function addCategoryController(req, res) {
    const { name, description } = req.body;
    const userid = req.cookies.auth.id;
    const conn = await DB.pool.getConnection();
    try {
        const categoryExists = await DB.useDB(
            "SELECT id FROM categories WHERE name = ? AND userid = ?",
            [name, userid]
        );
        if (categoryExists.length > 0) {
            conn.release();
            return res.status(400).json({ message: "Már létezik ilyen nevű kategória" });
        }
        const r = await DB.useDB(
            "INSERT INTO categories (name, description, userid) VALUES (?, ?, ?)",
            [name, description || null, userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Kategória hozzáadása sikertelen" });
        }
        conn.release();
        return res.status(201).json({ message: "Kategória sikeresen hozzáadva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}