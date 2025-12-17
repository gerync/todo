export default function deleteCategoryMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (!categoryid || isNaN(parseInt(categoryid, 10)) || parseInt(categoryid, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    req.query.categoryid = parseInt(categoryid, 10);
    next();
}
