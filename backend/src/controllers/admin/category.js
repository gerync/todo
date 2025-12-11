import DB from "../../database/useDB.js";

export async function listCategoriesByUserController(req, res) {
    const conn = await DB.pool.getConnection();
    const userid = req.query.userid;
    try {
        const categories = await DB.useDB(
            `SELECT id, name, description, createdat FROM categories WHERE userid = ?`,
            [userid]
        );
        conn.release();
        return res.status(200).json({ categories });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}
export async function DeleteCategoryController(req, res) {
    const categoryid = req.query.categoryid;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `DELETE FROM categories WHERE id = ?`,
            [categoryid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Kategória törlése sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Kategória sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}
export async function EditCategoryController(req, res) {
    const { categoryid, name, description } = req.body;
    const conn = await DB.pool.getConnection();
    let changes = [];
    let params = [];
    if (name) {
        changes.push("name = ?");
        params.push(name);
    }
    if (description) {
        changes.push("description = ?");
        params.push(description);
    }
    if (changes.length === 0) {
        conn.release();
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    params.push(categoryid);
    try {
        const r = await DB.useDB(
            `UPDATE categories SET ${changes.join(", ")} WHERE id = ?`,
            params
        );
        if (r.affectedRows === 0) {
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

export async function AddCategoryController(req, res) {
    const { name, description, userid } = req.body;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `INSERT INTO categories (name, description, userid) VALUES (?, ?, ?)`,
            [name, description || null, userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Kategória hozzáadása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Kategória sikeresen hozzáadva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export default {
    listCategoriesByUserController,
    DeleteCategoryController,
    EditCategoryController,
    AddCategoryController
};