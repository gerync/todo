export default function addTaskMiddleware(req, res, next) {
    const { category, title, description, dueDate } = req.body;
    if (!category || !title || !dueDate) {
        return res.status(400).json({ message: "Hiányzó mezők a kérésben" });
    }
    if (typeof category !== "string" || typeof title !== "string" || typeof dueDate !== "string" || (description && typeof description !== "string")) {
        return res.status(400).json({ message: "Érvénytelen mezők a kérésben" });
    }
    if (Object.keys(req.body).length < 3 || Object.keys(req.body).length > 4) {
        return res.status(400).json({ message: "Hibás mezők száma a kérésben" });
    }
    next();
}