export default function loginMiddleware(req, res, next) {
    const { userinfo, password } = req.body;
    if (Object.keys(req.body).length !== 2) {
        return res.status(400).json({ message: 'Nincsenek adatok elküldve, vagy több adat van küldve 2nél' });
    }
    if (!userinfo || !password) {
        return res.status(400).json({ message: 'Hiányzó felhasználói adat vagy jelszó' });
    }
    if (typeof userinfo !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Hibás adat típus' });
    }
    next();
}