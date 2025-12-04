import useDB from "../utils/useDB.js";
import getuserid from "../utils/userid.js";

export default async function listTasks(req, res) {
    const sessiontoken = req.cookies.authToken;
    try {
        const userid = await getuserid(sessiontoken);
        if (!userid) {
            return res.status(401).json({ message: 'Érvénytelen hitelesítő token, hozzáférés megtagadva' });
        }
        const query = `SELECT categories.name AS category, tasks.id, tasks.title, tasks.description, tasks.dueto, tasks.createdat
                       FROM tasks 
                       JOIN categories ON tasks.categoryid = categories.id
                       WHERE tasks.userid = ?`;
        const tasks = await useDB(query, [userid]);
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Hiba történt a feladatok lekérése során:', error);
        return res.status(500).json({ message: 'Hiba történt a feladatok lekérése során' });
    }
}