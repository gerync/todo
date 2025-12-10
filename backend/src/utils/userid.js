import useDB from "./useDB.js";

export default async function auth(sessiontoken) {
    try {
        const query = 'SELECT userid FROM sessions WHERE sessiontoken = ?';
        const results = await useDB(query, [sessiontoken]);
        if (results.length === 0) {
            return null;
        }
        return results[0].userid;
    } catch (error) {
        console.error('Hiba történt a hitelesítés során:', error);
        return null;
    }
}