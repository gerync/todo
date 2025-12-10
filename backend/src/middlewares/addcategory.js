export default function addCategoryMiddleware(req, res, next) {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: "A kategória neve megadása kötelező" });
    }
    next();
}