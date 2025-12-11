import DB from '../../database/useDB.js';
import argon2 from 'argon2';

export async function EditUserController(req, res) {
    const { username, email, birthdate, password } = req.body;
    const userid = req.query.userid;
    const conn = await DB.pool.getConnection();
    let changes = [];
    let params = [];
    if (username) {
        changes.push("username = ?");
        params.push(username);
    }
    if (email) {
        changes.push("email = ?");
        params.push(email);
    }
    if (birthdate) {
        changes.push("birthdate = ?");
        params.push(birthdate);
    }
    if (password) {
        const hashedPassword = await argon2.hash(password);
        changes.push("passwordhash = ?");
        params.push(hashedPassword);
    }
    if (changes.length === 0) {
        conn.release();
        return res.status(400).json({ message: "Nincs megváltoztatandó adat" });
    }
    params.push(userid);
    try {
        const r = await DB.useDB(
            `UPDATE users SET ${changes.join(", ")} WHERE id = ?`,
            params
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Adatok módosítása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Adatok sikeresen módosítva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function DeleteUserController(req, res) {
    const userid = req.query.userid;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `DELETE FROM users WHERE id = ?`,
            [userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Felhasználó törlése sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Felhasználó sikeresen törölve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function SuspendUserController(req, res) {
    const userid = req.query.userid;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `UPDATE users SET type = 'suspended' WHERE id = ?`,
            [userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Felhasználó felfüggesztése sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Felhasználó sikeresen felfüggesztve" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function ReactivateUserController(req, res) {
    const userid = req.query.userid;
    const conn = await DB.pool.getConnection();
    try {
        const r = await DB.useDB(
            `UPDATE users SET type = 'user' WHERE id = ? AND type = 'suspended'`,
            [userid]
        );
        if (r.affectedRows === 0) {
            conn.release();
            return res.status(500).json({ message: "Felhasználó újraaktiválása sikertelen" });
        }
        conn.release();
        return res.status(200).json({ message: "Felhasználó sikeresen újraaktiválva" });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function GetAllUsersController(req, res) {
    const conn = await DB.pool.getConnection();
    try {
        const users = await DB.useDB(
            `SELECT id, username, email, birthdate, type, createdat FROM users`
        );
        conn.release();
        return res.status(200).json({ users });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export async function GetUserByIdController(req, res) {
    const userid = req.query.userid;
    const conn = await DB.pool.getConnection();
    try {
        const user = await DB.useDB(
            `SELECT id, username, email, birthdate, type, createdat FROM users WHERE id = ?`,
            [userid]
        );
        conn.release();
        if (user.length === 0) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        return res.status(200).json({ user: user[0] });
    }
    catch (error) {
        conn.release();
        return res.status(500).json({ message: "Belső szerverhiba" });
    }
}

export default {
    EditUserController,
    DeleteUserController,
    SuspendUserController,
    ReactivateUserController,
    GetAllUsersController,
    GetUserByIdController
};