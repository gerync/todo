import useDB from "../utils/useDB.js";

export default async function auth(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'Nincs hitelesítő token, hozzáférés megtagadva' });
    }
    try {
        const query = 'SELECT userid, expiresat, createdat FROM sessions WHERE sessiontoken = ?';
        const results = await useDB(query, [token]);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Érvénytelen hitelesítő token, hozzáférés megtagadva' });
        }
        const now = new Date();
        const expiresAt = new Date(results[0].expiresat);
        if (expiresAt < now) {
            return res.status(401).json({ message: 'A hitelesítő token lejárt, hozzáférés megtagadva' });
        }
        if (results[0].createdat > now) {
            return res.status(401).json({ message: 'Érvénytelen hitelesítő token, hozzáférés megtagadva' });
        }
        const [ type ] = await useDB('SELECT type FROM users WHERE id = ?', [results[0].userid]);
        if (!type) {
            return res.status(401).json({ message: 'Érvénytelen felhasználó, hozzáférés megtagadva' });
        }
        if (type.type === 'suspended') {
            return res.status(403).json({ message: 'A felhasználó felfüggesztve, hozzáférés megtagadva' });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Hiba történt a hitelesítés során' });
    }
}