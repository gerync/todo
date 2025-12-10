import useDB from '../utils/useDB.js';

export default async function addTask(req, res) {
    const { title, description, dueto, category } = req.body;
    const sessiontoken = req.cookies.authToken;
    let categoryId = null;
    try {
        const queryUser = 'SELECT userid FROM sessions WHERE sessiontoken = ?';
        const userResults = await useDB(queryUser, [sessiontoken]);
        if (userResults.length === 0) {
            return res.status(401).json({ message: 'Érvénytelen hitelesítő token, hozzáférés megtagadva' });
        }
        const userid = userResults[0].userid;
        const queryCategory = 'SELECT id FROM categories WHERE userid = ? AND name = ?';
        const categoryResults = await useDB(queryCategory, [userid, category]);
        if (categoryResults.length === 0) {
            const queryInsertCategory = 'INSERT INTO categories (userid, name) VALUES (?, ?)';
            const insertCategoryResult = await useDB(queryInsertCategory, [userid, category]);
            categoryId = insertCategoryResult.insertId;
        } else {
            categoryId = categoryResults[0].id;
        }
        const queryInsertTask = 'INSERT INTO tasks (userid, title, description, dueto, categoryid) VALUES (?, ?, ?, ?, ?)';
        await useDB(queryInsertTask, [userid, title, description, dueto, categoryId]);
        return res.status(201).json({ message: 'Feladat sikeresen hozzáadva' });
    } catch (error) {
        console.error('Hiba történt a feladat hozzáadása során:', error);
        return res.status(500).json({ message: 'Hiba történt a feladat hozzáadása során' });
    }
}