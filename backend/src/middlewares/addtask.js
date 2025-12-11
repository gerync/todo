export default function addTaskMiddleware(req, res, next) {
    const { category, title, description, dueDate } = req.body;
    if (!category || !title || !dueDate) {
        return res.status(400).json({ message: "Hiányzó mezők a kérésben" });
    }
    if (Object.keys(req.body).length < 3 || Object.keys(req.body).length > 4) {
        return res.status(400).json({ message: "Hibás mezők száma a kérésben" });
    }
    if (typeof category !== "string") 
        {
        req.body.category = String(category);
        }
    if (typeof title !== "string") 
        {
        req.body.title = String(title);
        }
    if (typeof dueDate !== "string") 
        {
        req.body.dueDate = String(dueDate);
        }
    if (description && typeof description !== "string") 
        {
        req.body.description = String(description);
        }
    next();
}