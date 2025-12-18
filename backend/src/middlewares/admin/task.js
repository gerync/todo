export function AddTaskAdminMiddleware(req, res, next) {
    const { title, description, duedate, categoryid, userid } = req.body;
    if (!title || typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ message: "A feladat címe kötelező" });
    }
    if (!duedate || isNaN(Date.parse(duedate))) {
        return res.status(400).json({ message: "Érvénytelen határidő" });
    }
    if (!categoryid || isNaN(parseInt(categoryid, 10))) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    next();
}

export function EditTaskAdminMiddleware(req, res, next) {
    const { taskid, title, description, duedate, iscompleted, categoryid } = req.body;
    if (!taskid || isNaN(parseInt(taskid, 10))) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    if (
        title === undefined && description === undefined &&
        duedate === undefined && iscompleted === undefined &&
        categoryid === undefined
    ) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
        return res.status(400).json({ message: "Érvénytelen cím" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    if (duedate !== undefined && isNaN(Date.parse(duedate))) {
        return res.status(400).json({ message: "Érvénytelen határidő" });
    }
    if (iscompleted !== undefined && typeof iscompleted !== "boolean" && iscompleted !== 0 && iscompleted !== 1) {
        return res.status(400).json({ message: "Érvénytelen kész állapot" });
    }
    if (categoryid !== undefined && isNaN(parseInt(categoryid, 10))) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    next();
}

export function DeleteTaskAdminMiddleware(req, res, next) {
    const { taskid } = req.query;
    if (!taskid || isNaN(parseInt(taskid, 10))) {
        return res.status(400).json({ message: "Érvénytelen feladat azonosító" });
    }
    next();
}

export function ListTasksByCategoryAdminMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (!categoryid || isNaN(parseInt(categoryid, 10)) || parseInt(categoryid, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    req.query.categoryid = parseInt(categoryid, 10);
    next();
}

export default {
    AddTaskAdminMiddleware,
    EditTaskAdminMiddleware,
    DeleteTaskAdminMiddleware,
    ListTasksByCategoryAdminMiddleware
};
