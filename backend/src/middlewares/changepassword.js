export default function changePasswordMiddleware(req, res, next) {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: "Minden mező kitöltése kötelező" });
    }
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "Az új jelszavak nem egyeznek" });
    }
    if (newPassword.length < 8) {
        return res.status(400).json({ message: "Az új jelszónak legalább 8 karakter hosszúnak kell lennie" });
    }
    if (Object.keys(req.body).length != 3) {
        return res.status(400).json({ message: "Érvénytelen mezők a kérésben" });
    }
    if (typeof oldPassword !== "string")
        {
        req.body.oldPassword = String(oldPassword);
        }
    if (typeof newPassword !== "string")
        {
        req.body.newPassword = String(newPassword);
        }
    if (typeof confirmNewPassword !== "string")
        {
        req.body.confirmNewPassword = String(confirmNewPassword);
        }
    next();
}