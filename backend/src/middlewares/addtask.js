export default function addTaskMiddleware(req, res, next) {
    const { category, title, description, dueDate } = req.body;
    if (!category || !title || !dueDate) {
        return res.status(400).json({ message: "Hiányzó mezők a kérésben" });
    }
    if (Object.keys(req.body).length < 3 || Object.keys(req.body).length > 4) {
        return res.status(400).json({ message: "Hibás mezők száma a kérésben" });
    }
    if (typeof category !== "string" || category.trim().length === 0) {
        return res.status(400).json({ message: "Érvénytelen kategória" });
    }
    if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ message: "Érvénytelen cím" });
    }
    if (typeof dueDate !== "string") {
        return res.status(400).json({ message: "Érvénytelen határidő formátum" });
    }
    const d = new Date(dueDate);
    if (isNaN(d.getTime())) {
        return res.status(400).json({ message: "Érvénytelen határidő formátum" });
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    req.body.dueDate = `${year}-${month}-${day}`;
    req.body.category = category.trim();
    req.body.title = title.trim();
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    next();
}