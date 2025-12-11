export default function changeInfoMiddleware(req, res, next) {
    const { username, email, birhdate } = req.body;
    if (!username && !email && !birhdate) {
        return res.status(400).json({ message: "Legalább egy adat megadása kötelező" });
    }
    if (username && typeof username !== 'string') 
        {
        req.body.username = String(username);
        }
    if (email && typeof email !== 'string') 
        {
        req.body.email = email
        }
    if (username && username.trim().length === 0) {
        return res.status(400).json({ message: "A felhasználónév érvénytelen" });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Az email cím érvénytelen" });
    }
    if (birhdate && isNaN(Date.parse(birhdate))) {
        req.body.birhdate = Date.parse(birhdate);
    }
    next();
}