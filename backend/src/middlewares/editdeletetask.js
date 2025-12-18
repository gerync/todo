export function EditTaskMiddleware(req, res, next) {
    const id = req.body.id ?? req.query.id;
    if (!id || isNaN(parseInt(id, 10)) || parseInt(id, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    req.query.id = parseInt(id, 10);

    const { title, description, dueDate, isCompleted, category } = req.body;

    if (
        title === undefined &&
        description === undefined &&
        dueDate === undefined &&
        isCompleted === undefined &&
        category === undefined
    ) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim().length === 0) {
            return res.status(400).json({ message: "Érvénytelen cím" });
        }
        req.body.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            return res.status(400).json({ message: "Érvénytelen leírás" });
        }
        req.body.description = description;
    }

    if (dueDate !== undefined) {
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
    }

    if (isCompleted !== undefined) {
        if (typeof isCompleted !== "boolean") {
            return res.status(400).json({ message: "Érvénytelen kész állapot" });
        }
        req.body.isCompleted = isCompleted;
    }

    if (category !== undefined) {
        if (typeof category !== "string" || category.trim().length === 0) {
            return res.status(400).json({ message: "Érvénytelen kategória" });
        }
        req.body.category = category.trim();
    }

    next();
}
export function DeleteTaskMiddleware(req, res, next) {
    const id = req.query.id;
    if (!id || isNaN(parseInt(id, 10)) || parseInt(id, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    req.query.id = parseInt(id, 10);
    next();
}

export default { EditTaskMiddleware, DeleteTaskMiddleware };