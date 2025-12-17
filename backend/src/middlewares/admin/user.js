const emailRegex = /^\S+@\S+\.\S+$/;

export function EditUserAdminMiddleware(req, res, next) {
    const { userid } = req.query;
    const { username, email, birthdate, password } = req.body;
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    if (username === undefined && email === undefined && birthdate === undefined && password === undefined) {
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    if (username !== undefined && (typeof username !== "string" || username.trim().length === 0)) {
        return res.status(400).json({ message: "Érvénytelen felhasználónév" });
    }
    if (email !== undefined && (typeof email !== "string" || !emailRegex.test(email))) {
        return res.status(400).json({ message: "Érvénytelen email" });
    }
    if (birthdate !== undefined && isNaN(Date.parse(birthdate))) {
        return res.status(400).json({ message: "Érvénytelen születési dátum" });
    }
    if (password !== undefined && (typeof password !== "string" || password.length < 6)) {
        return res.status(400).json({ message: "A jelszónak legalább 6 karakternek kell lennie" });
    }
    next();
}

export function DeleteUserAdminMiddleware(req, res, next) {
    const { userid } = req.query;
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    next();
}

export function SuspendUserAdminMiddleware(req, res, next) {
    const { userid } = req.query;
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    next();
}

export function ReactivateUserAdminMiddleware(req, res, next) {
    const { userid } = req.query;
    if (!userid || isNaN(parseInt(userid, 10))) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    next();
}

export function GetUserAdminMiddleware(req, res, next) {
    const { userid } = req.query;
    if (!userid || isNaN(parseInt(userid, 10)) || parseInt(userid, 10) < 1) {
        return res.status(400).json({ message: "Érvénytelen felhasználó azonosító" });
    }
    req.query.userid = parseInt(userid, 10);
    next();
}

export default {
    EditUserAdminMiddleware,
    DeleteUserAdminMiddleware,
    SuspendUserAdminMiddleware,
    ReactivateUserAdminMiddleware,
    GetUserAdminMiddleware
};
