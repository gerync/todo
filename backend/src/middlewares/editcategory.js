export default function editCategoryMiddleware(req, res, next) {
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
