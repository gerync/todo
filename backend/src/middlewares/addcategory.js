export default function addCategoryMiddleware(req, res, next) {
    const { name } = req.body;
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ message: "A kategória neve megadása kötelező" });
    }
    if (typeof name !== 'string') {
        req.body.name = String(name);
    }
    next();
}