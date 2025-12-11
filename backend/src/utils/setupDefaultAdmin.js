import DB from "../database/useDB.js";
import argon2 from "argon2";
import config from "../config.js";

export default async function setupDefaultAdmin() {
    const conn = await DB.pool.getConnection();
    try {
        const users = await DB.useDB(
            "SELECT * FROM users WHERE username = ?",
            [config.baseadmin.username]
        );
        if (users.length === 0) {
            const hashedPassword = await argon2.hash(config.baseadmin.password);
            await DB.useDB(
                "INSERT INTO users (username, email, birthdate, passwordhash, type) VALUES (?, ?, ?, ?, 'admin')",
                [
                    config.baseadmin.username,
                    config.baseadmin.email,
                    config.baseadmin.birthdate,
                    hashedPassword
                ]
            );
            console.log("Alapértelmezett admin felhasználó létrehozva.");
            console.log(`Felhasználónév: ${config.baseadmin.username}\nJelszó: ${config.baseadmin.password}`);
        } else {
            console.log("Alapértelmezett admin felhasználó már létezik.");
        }
        conn.release();
    } catch (error) {
        conn.release();
        console.error("Hiba az alapértelmezett admin felhasználó létrehozásakor:", error);
    }
}
