export default function listTasksMiddleware(req, res, next) {
    const { categoryid } = req.query;
    if (categoryid && isNaN(parseInt(categoryid))) {
        return res.status(400).json({ message: "A kategória azonosítónak számnak kell lennie" });
    }
    if (categoryid && parseInt(categoryid) < 1) {
        return res.status(400).json({ message: "A kategória azonosítónak pozitív számnak kell lennie" });
    }
    next();
}