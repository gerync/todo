import argon2 from 'argon2';
import useDB from './useDB';
import config from './config';

export default async function adminSetup() {
    const checkAdminQuery = `SELECT * FROM users WHERE type = 'admin' LIMIT 1`;
    const admins = await useDB(checkAdminQuery, []);
    if (admins > 0) {
        console.log('Admin felhasználó már létezik.');
        return;
    }
    const adminConfig = config().defAdmin;
    const defAdminUsername = adminConfig.username;
    const defAdminPassword = adminConfig.password;
    const defAdminEmail = adminConfig.email;
    const hashedPassword = await argon2.hash(defAdminPassword);
    const type = adminConfig.type;
    const createdat = adminConfig.createdat;
    try {
        const insertAdminQuery = `INSERT INTO users (username, password, email, type, createdat) VALUES (?, ?, ?, ?, ?)`;
        await useDB(insertAdminQuery, [defAdminUsername, hashedPassword, defAdminEmail, type, createdat]);
        console.log(`Alapértelmezett admin felhasználó létrehozva: Felhasználónév: ${defAdminUsername}, Jelszó: ${defAdminPassword}`);
    }
    catch (error) {
        console.error('Hiba történt az admin felhasználó létrehozása során:', error);
    }
}