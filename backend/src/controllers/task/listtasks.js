import DB from "../../database/useDB.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function listTasksController(req, res) {
    const userid = jwt.verify(req.cookies.auth, config.jwtSecret).id;;
    const category = req.params.categoryid || req.query.categoryid;
    const conn = await DB.pool.getConnection();
    try {
        let tasks;
        if (category) {
            tasks = await DB.useDB(
                "SELECT id, title, description, dueto, iscompleted FROM tasks WHERE userid = ? AND categoryid = ?",
                [userid, category]
            );
        } else {
            tasks = await DB.useDB(
                "SELECT id, title, description, dueto, iscompleted FROM tasks WHERE userid = ?",
                [userid]
            );
        }
        conn.release();
        const formattedTasks = tasks.map(task => ({
            ...task,
            dueto: task.dueto ? new Date(task.dueto).toISOString().split('T')[0] : null
        }));
        return res.status(200).json({ tasks: formattedTasks });
    }
    catch (error) {
        conn.release();
        console.error("List tasks error:", error);
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}