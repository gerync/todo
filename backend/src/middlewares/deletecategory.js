export default function deleteCategoryMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (!categoryid ) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    if (!isNaN(Number(categoryid))) {
        req.query.categoryid = String(categoryid);
    }
    next();
}
