import useDB from "../utils/useDB.js";
export default async (req, res) => {
    try {
        const query = `SELECT username, email, createdat, type FROM users`;
        const users = await useDB(query, []);
        return res.status(200).json(users);
    }
    catch (error) {
        console.error('Hiba történt a felhasználók lekérése során:', error);
        return res.status(500).json({ message: 'Hiba történt a felhasználók lekérése során' });
    }
}