export default function authMiddleware(req, res, next) {
    if (!req.cookies || !req.cookies.auth || !req.cookies.auth.id) {
        return res.status(401).json({ message: "Nincs érvényes hitelesítés" });
    }
    next();
}