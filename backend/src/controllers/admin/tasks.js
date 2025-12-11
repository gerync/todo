import DB from "../../database/useDB.js";

export async function EditTaskController(req, res) {
    const { taskid, title, description, duedate, iscompleted, categoryid } = req.body;
    const conn = await DB.pool.getConnection();
    let changes = [];
    let params = [];
    if (title) {
        changes.push("title = ?");
        params.push(title);
    }
    if (description) {
        changes.push("description = ?");
        params.push(description);
    }
    if (duedate) {
        changes.push("dueto = ?");
        params.push(duedate);
    }
    if (iscompleted !== undefined) {
        changes.push("iscompleted = ?");
        params.push(iscompleted);
    }
    if (categoryid) {
        changes.push("categoryid = ?");
        params.push(categoryid);
    }
    if (changes.length === 0) {
        conn.release();
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    params.push(taskid);
    try {
        const r = await DB.useDB(
            `UPDATE tasks SET ${changes.join(", ")} WHERE id = ?`,
            params
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Feladat módosítása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Feladat sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function DeleteTaskController(req, res) {
    const taskid = req.query.taskid;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `DELETE FROM tasks WHERE id = ?`,
            [taskid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Feladat törlése sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Feladat sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function ListTasksByCategory(req, res) {
    const categoryid = req.query.categoryid;
    const conn = await DB.pool.getConnection();
    try {
        const tasks = await DB.useDB(
            `SELECT * FROM tasks WHERE categoryid = ?`,
            [categoryid]
        );
        conn.release();
        return res.status(200).json({ tasks });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function AddTask(req, res) {
    const { title, description, duedate, categoryid, userid } = req.body;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `INSERT INTO tasks (title, description, dueto, categoryid, userid) VALUES (?, ?, ?, ?, ?)`,
            [title, description || null, duedate, categoryid, userid]
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
        console.error("Admin add task error:", error);
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export default {
    EditTaskController,
    DeleteTaskController,
    ListTasksByCategory,
    AddTask
};