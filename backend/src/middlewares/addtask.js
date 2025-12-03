export default function addTaskMiddleware(req, res, next) {
    const { title, description, dueto, category } = req.body;
    if (Object.keys(req.body).length !== 4) {
        return res.status(400).json({ message: 'Hibás mezők száma' });
    }
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Az elnevezés nem szöveg típusú vagy üres' });
    }
    if (description && typeof description !== 'string') {
        return res.status(400).json({ message: 'A leírásnak szöveg típusúnak kell lennie.' });
    }
    if (dueto) {
        const duetoObj = new Date(dueto);
        if (isNaN(duetoObj.getTime())) {
        return res.status(400).json({ message: 'A határidő érvénytelen dátum.' });
        }
    }
    if (category && typeof category !== 'string') {
        return res.status(400).json({ message: 'A kategóriának szöveg típusúnak kell lennie.' });
    }
    if (title.length > 100) {
        return res.status(400).json({ message: 'Az elnevezés nem lehet hosszabb 100 karakternél.' });
    }
    if (description && description.length > 250) {
        return res.status(400).json({ message: 'A leírás nem lehet hosszabb 500 karakternél.' });
    }
    if (category && category.length > 50) {
        return res.status(400).json({ message: 'A kategória nem lehet hosszabb 50 karakternél.' });
    }
    next();
}