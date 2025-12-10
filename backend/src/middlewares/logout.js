export default function logoutMiddleware(req, res, next) {
    const authCookie = req.cookies.auth;
    if (!authCookie) {
        return res.status(401).json({ message: "Nincs bejelentkezve" });
    }
    next();
}