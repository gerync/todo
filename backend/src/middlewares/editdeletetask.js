export function EditTaskMiddleware(req, res, next) {
    const { id } = req.body;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    const { title, description, dueDate, isCompleted, category } = req.body;
    if (title === undefined && description === undefined && dueDate === undefined &&
        isCompleted === undefined && category === undefined ) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (dueDate !== undefined && isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ message: "Érvénytelen határidő formátum" });
    }
    if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
        return res.status(400).json({ message: "Érvénytelen kész állapot" });
    }
    if (category !== undefined && typeof category !== "string") {
        return res.status(400).json({ message: "Érvénytelen kategória" });
    }
    if (title !== undefined && typeof title !== "string") {
        return res.status(400).json({ message: "Érvénytelen cím" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    next();
}
export function DeleteTaskMiddleware(req, res, next) {
    const { id } = req.query;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    next();
}

export default { EditTaskMiddleware, DeleteTaskMiddleware };