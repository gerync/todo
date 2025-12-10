import useDB from "../utils/useDB.js";
import getuserid from "../utils/userid.js";

export default async function adminMiddleware(req, res, next) {
    const sessiontoken = req.cookies.authToken;
    try {
        const userid = await getuserid(sessiontoken);
        if (!userid) {
            return res.status(401).json({ message: 'Érvénytelen hitelesítő token, hozzáférés megtagadva' });
        }
        const query = `SELECT type FROM users WHERE id = ?`;
        const results = await useDB(query, [userid]);
        if (results.length === 0 || results[0].type !== 'admin') {
            return res.status(403).json({ message: 'Hozzáférés megtagadva: csak adminisztrátorok számára' });
        }
        next();
    } catch (error) {
        console.error('Hiba történt a jogosultság ellenőrzése során:', error);
        return res.status(500).json({ message: 'Hiba történt a jogosultság ellenőrzése során' });
    }
}