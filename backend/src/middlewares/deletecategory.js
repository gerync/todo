export default function deleteCategoryMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (!categoryid || isNaN(parseInt(categoryid, 10))) {
        return res.status(400).json({ message: "Érvénytelen kategória azonosító" });
    }
    next();
}
