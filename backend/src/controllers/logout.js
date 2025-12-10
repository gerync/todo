export default async function logoutUser(req, res) {
    const sessionToken = req.cookies.authToken;
    if (!sessionToken) {
        res.clearCookie('authToken');
        return res.status(400).json({ message: 'Nincs érvényes munkamenet' });
    }
    try {
        const deleteQuery = 'DELETE FROM sessions WHERE sessiontoken = ?';
        await useDB(deleteQuery, [sessionToken]);
        res.clearCookie('authToken');
        res.status(200).json({ message: 'Sikeres kijelentkezés' });
    } catch (error) {
        res.clearCookie('authToken');
        console.error('Hiba történt a kijelentkezés során:', error);
        res.status(500).json({ message: 'Hiba történt a kijelentkezés során' });
    }
}