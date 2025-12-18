import DB from '../../database/useDB.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

export async function DeleteTaskController(req, res) {
    const id = req.query.id;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            "DELETE FROM tasks WHERE id = ? AND userid = ?",
            [id, userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(404).json({ message: "Feladat nem található" });
        }
        conn.release();
        return res.status(200).json({ message: "Feladat sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function EditTaskController(req, res) {
    const id = req.query.id;
    const { title, description, dueDate, isCompleted, category } = req.body;
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const conn = await DB.pool.getConnection();
    try {
        const changes = [];
        const params = [];
        if (title) {
            changes.push("title = ?");
            params.push(title);
        }
        if (description !== undefined) {
            changes.push("description = ?");
            params.push(description);
        }
        if (dueDate) {
            changes.push("dueto = ?");
            params.push(dueDate);
        }
        if (isCompleted !== undefined) {
            changes.push("iscompleted = ?");
            params.push(isCompleted);
        }
        if (category) {
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
            changes.push("categoryid = ?");
            params.push(categoryId);
        }
        if (changes.length === 0) {
            conn.release();
            return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
        }
        params.push(id, userid);
        const r = await DB.useDB(
            `UPDATE tasks SET ${changes.join(", ")} WHERE id = ? AND userid = ?`,
            params
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(404).json({ message: "Feladat nem található" });
        }
        conn.release();
        return res.status(200).json({ message: "Feladat sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export default { DeleteTaskController, EditTaskController };