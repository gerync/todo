export default function registerMiddleware(req, res, next) {
    const { username, password, email, birthdate } = req.body;
    if (Object.keys(req.body).length !== 4) {
        return res.status(400).json({ message: 'Nincsenek adatok elküldve, vagy több adat van küldve 4nél' });
    }
    if (!username || !password || !email || !birthdate) {
        return res.status(400).json({ message: 'Hiányzó felhasználói adatok' });
    }
    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string' || typeof birthdate !== 'string') {
        return res.status(400).json({ message: 'Hibás adat típus' });
    }
    if (password.length < 8 || password.length > 32) {
        return res.status(400).json({ message: 'A jelszónak 8 és 32 karakter közé kell esnie' });
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'A jelszónak tartalmaznia kell legalább egy számot és egy speciális karaktert' });
    }
    const usernameRegex = /^(?=.{3,24}$)(?!.*[A-Z])[a-z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'A felhasználónév csak kisbetűket, számokat, alulvonást és kötőjelet tartalmazhat, és 3-24 karakter hosszú lehet' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Érvénytelen email cím' });
    }
    const birthdateObj = new Date(birthdate);
    if (isNaN(birthdateObj.getTime())) {
        return res.status(400).json({ message: 'Érvénytelen születési dátum' });
    }
    if (birthdateObj > new Date()) {
        return res.status(400).json({ message: 'A születési dátum nem lehet a jövőben' });
    }
    next();
}