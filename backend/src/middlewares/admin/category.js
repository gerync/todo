export function AddCategoryAdminMiddleware(req, res, next) {
    const { name, description, userid } = req.body;
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({ message: "A kategória neve megadása kötelező" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    next();
}

export function EditCategoryAdminMiddleware(req, res, next) {
    const { categoryid, name, description } = req.body;
    if (!categoryid || isNaN(parseInt(categoryid, 10))) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    if (name === undefined && description === undefined) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
        return res.status(400).json({ message: "Érvénytelen kategória név" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    next();
}

export function DeleteCategoryAdminMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (!categoryid || isNaN(parseInt(categoryid, 10))) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    next();
}

export default {
    AddCategoryAdminMiddleware,
    EditCategoryAdminMiddleware,
    DeleteCategoryAdminMiddleware
};
