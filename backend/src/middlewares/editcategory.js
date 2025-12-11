export default function editCategoryMiddleware(req, res, next) {
    const { categoryid, name, description } = req.body;
    if (!categoryid ) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    if (name === undefined && description === undefined) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (name !== undefined && name.trim().length === 0) {
        return res.status(400).json({ message: "Érvénytelen kategória név" });
    }
    if (description !== undefined) {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    if (!isNaN(parseInt(categoryid, 10))) {
        req.body.categoryid = parseInt(categoryid);
    }
    if (typeof description !== "string") {
        req.body.description = String(description);
    }
    if (typeof name !== "string" ) {
        req.body.name = String(name);
    }
    next();
}
