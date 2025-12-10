import DB from "../database/useDB.js";
import argon2 from "argon2";

export default async function registerController(req, res) {
    const { username, password, birthdate, email } = req.body;
    const conn = await DB.pool.getConnection();
    const hashedPassword = await argon2.hash(password);
    try {
        await DB.useDB(
            "INSERT INTO users (username, password, birthdate, email) VALUES (?, ?, ?, ?)",
            [username, hashedPassword, birthdate, email]
        );
        conn.release();
        return res.status(201).json({ message: "Sikeres regisztráció" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            conn.release();
            res.status(409).json({ message: "Felhasználónév már foglalt" });
        } else {
            conn.release();
            res.status(500).json({ message: "Belső szerverhiba" });
        }
    }
}