export default function registerMiddleware(req, res, next) {
    const { username, password, birthdate, email } = req.body;
    const auth = req.cookies.auth;
    if (auth) {
        return res.status(400).json({ message: "Már be vagy jelentkezve" });
    }
    if (Object.keys(req.body).length !== 4) {
        return res.status(400).json({ message: "Túl sok mező a kérésben" });
    }
    if (!username || !password || !birthdate || !email) {
        return res.status(400).json({ message: "Minden mező kitöltése kötelező" });
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof birthdate !== 'string' || typeof email !== 'string') {
        return res.status(400).json({ message: "A felhasználónévnek és jelszónak szövegnek kell lennie" });
    }

    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ message: "A felhasználónévnek 3 és 20 karakter közötti hosszúságúnak kell lennie" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "A jelszónak legalább 6 karakter hosszúnak kell lennie" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Érvénytelen email cím" });
    }

    const birthdateObj = new Date(birthdate);
    const today = new Date();
    if (isNaN(birthdateObj.getTime()) || birthdateObj >= today) {
        return res.status(400).json({ message: "Érvénytelen születési dátum" });
    }
    next();
}