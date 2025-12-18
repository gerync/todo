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
        const formatDuoTo = (dueto) => {
            if (!dueto) return null;
            const date = new Date(dueto);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        const formattedTasks = tasks.map(task => ({
            ...task,
            dueto: formatDuoTo(task.dueto)
        }));
        return res.status(200).json({ tasks: formattedTasks });
    }
    catch (error) {
        conn.release();
        console.error("List tasks error:", error);
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}