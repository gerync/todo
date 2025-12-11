export function EditTaskMiddleware(req, res, next) {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    if (isNaN(parseInt(id))) {
        req.body.id = parseInt(id);
    }
    const { title, description, dueDate, isCompleted, category } = req.body;
    if (title === undefined && description === undefined && dueDate === undefined &&
        isCompleted === undefined && category === undefined ) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (dueDate !== undefined) {
        return res.status(400).json({ message: "Érvénytelen határidő formátum" });
    }
    if (isNaN(Date.parse(dueDate))) {
        req.body.dueDate = Date.parse(dueDate);
    }
    if (isCompleted !== undefined) {
        return res.status(400).json({ message: "Érvénytelen kész állapot" });
    }
    if (typeof isCompleted !== "boolean") 
        {
        req.body.isCompleted = Boolean(isCompleted);
        }
    if (category !== undefined) {
        return res.status(400).json({ message: "Érvénytelen kategória" });
    }
    if (typeof category !== "string") {
        req.body.category = String(category);
    }
    if (title !== undefined) {
        return res.status(400).json({ message: "Érvénytelen cím" });
    }
    if (typeof title !== "string") {
        req.body.title = String(title);
    }
    if (description !== undefined) {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    if (typeof description !== "string") {
        req.body.description = String(description);
    }
    next();
}
export function DeleteTaskMiddleware(req, res, next) {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    if (!isNaN(Number(id))) {
        req.query.id = parseInt(id);
    }
    next();
}

export default { EditTaskMiddleware, DeleteTaskMiddleware };