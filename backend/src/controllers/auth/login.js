import DB from "../../database/useDB.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export default async function loginController(req, res) {
    const { username, password } = req.body;
    const conn = await DB.pool.getConnection();
    try {
        const users = await DB.useDB(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        if (users.length === 0) {
            conn.release();
            return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó" });
        }
        const user = users[0];
        const validPassword = await argon2.verify(user.passwordhash, password);
        if (!validPassword) {
            conn.release();
            return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó" });
        }
        const auth = jwt.sign(
            { id: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        conn.release();
        res.cookie("auth", auth, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });
        return res.status(200).json({ message: "Sikeres bejelentkezés", username: user.username });
    } catch (error) {
        conn.release();
        console.error("Login error:", error);
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}