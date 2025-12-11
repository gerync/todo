import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function addTaskController(req, res) {
    const { title, description, dueDate, category } = req.body;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
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
            "INSERT INTO tasks (title, description, dueto, categoryid, userid) VALUES (?, ?, ?, ?, ?)",
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
        console.error("Add task error:", error);
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}