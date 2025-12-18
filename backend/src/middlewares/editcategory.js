export default function editCategoryMiddleware(req, res, next) {
    const { categoryid, name, description } = req.body;
    if (!categoryid || isNaN(parseInt(categoryid, 10)) || parseInt(categoryid, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    req.body.categoryid = parseInt(categoryid, 10);
    if (name === undefined && description === undefined) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
        return res.status(400).json({ message: "Érvénytelen kategória név" });
    }
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).json({ message: "Érvénytelen leírás" });
    }
    if (name !== undefined) req.body.name = name.trim();
    if (description !== undefined) req.body.description = description;
    next();
}
