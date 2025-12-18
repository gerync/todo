export default function listTasksMiddleware(req, res, next) {
    const raw = req.params.categoryid ?? req.query.categoryid;
    if (raw === undefined) return next();
    const n = parseInt(raw, 10);
    if (isNaN(n) || n < 1) {
        return res.status(400).json({ message: "A kategória azonosítónak pozitív egész számnak kell lennie" });
    }
    if (req.params.categoryid !== undefined) {
        req.params.categoryid = n;
    } else {
        req.query.categoryid = n;
    }
    next();
}