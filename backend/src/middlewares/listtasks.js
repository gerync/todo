export default function listTasksMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (categoryid) {
        return res.status(400).json({ message: "A kategória azonosítónak számnak kell lennie" });
    }
    if (isNaN(parseInt(categoryid))) {
        req.query.categoryid = parseInt(categoryid);
    }
    if (categoryid && parseInt(categoryid) < 1) {
        return res.status(400).json({ message: "A kategória azonosítónak pozitív számnak kell lennie" });
    }
    next();
}