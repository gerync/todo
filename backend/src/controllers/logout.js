export default function logoutController(req, res) {
    res.clearCookie("auth");
    return res.status(200).json({ message: "Sikeres kijelentkezés" });
}