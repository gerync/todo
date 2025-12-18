export default function changeInfoMiddleware(req, res, next) {
    const { username, email, birthdate } = req.body;
    if (username === undefined && email === undefined && birthdate === undefined) {
        return res.status(400).json({ message: "Legalább egy adat megadása kötelező" });
    }
    if (username !== undefined && typeof username !== 'string') {
        return res.status(400).json({ message: "A felhasználónév érvénytelen" });
    }
    if (email !== undefined && typeof email !== 'string') {
        return res.status(400).json({ message: "Az email cím érvénytelen" });
    }
    if (username !== undefined && username.trim().length === 0) {
        return res.status(400).json({ message: "A felhasználónév érvénytelen" });
    }
    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Az email cím érvénytelen" });
    }
    if (birthdate !== undefined) {
        const d = new Date(birthdate);
        const today = new Date();
        if (isNaN(d.getTime()) || d >= today) {
            return res.status(400).json({ message: "Érvénytelen születési dátum" });
        }
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        req.body.birthdate = `${year}-${month}-${day}`;
    }
    if (username !== undefined) req.body.username = username.trim();
    if (email !== undefined) req.body.email = String(email);
    next();
}