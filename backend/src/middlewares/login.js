export default function loginMiddleware(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Hiányzó felhasználónév vagy jelszó" });
    }
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "Érvénytelen felhasználónév vagy jelszó" });
    }
    if (Object.keys(req.body).length !== 2) {
        return res.status(400).json({ message: "Túl sok mező a kérésben" });
    }
    const auth = req.cookies.auth;
    if (auth) {
        return res.status(400).json({ message: "Már be vagy jelentkezve" });
    }
    next();
}