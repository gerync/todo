import DB from "../database/useDB.js";

export default async function addTaskController(req, res) {
    const { title, description, dueDate, category } = req.body;
    const userid = req.cookies.auth.id;
    const conn = await DB.pool.getConnection();
    try {
        const categoryQuery = await DB.useDB(
            "SELECT id FROM categories WHERE name = ? AND userid = ?",
            [category, userid]
        );
        let categoryId;
        if (categoryQuery.length === 0) {
            const result = await DB.useDB(
                "INSERT INTO categories (name, userid) VALUES (?, ?)",
                [category, userid]);
            categoryId = result.insertId;
        }
        else {
            categoryId = categoryQuery[0].id;
        }
        const r = await DB.useDB(
            "INSERT INTO tasks (title, description, dueDate, categoryid, userid) VALUES (?, ?, ?, ?, ?)",
            [title, description || null, dueDate, categoryId, userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Feladat hozzáadása sikertelen" });
        }
        conn.release();
        return res.status(201).json({ message: "Feladat sikeresen hozzáadva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}