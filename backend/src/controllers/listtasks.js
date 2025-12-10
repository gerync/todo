import DB from "../database/useDB.js";

export default async function listTasksController(req, res) {
    const userid = req.cookies.auth.id;
    const category = req.query.categoryid;
    const conn = await DB.pool.getConnection();
    try {
        let tasks;
        if (category) {
            tasks = await DB.useDB(
                "SELECT id, title, description, duedate, iscompleted FROM tasks WHERE userid = ? AND categoryid = ?",
                [userid, category]
            );
        } else {
            tasks = await DB.useDB(
                "SELECT id, title, description, duedate, iscompleted FROM tasks WHERE userid = ?",
                [userid]
            );
        }
        conn.release();
        return res.status(200).json({ tasks });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}