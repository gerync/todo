import dotenv from 'dotenv';
export default function() {
    dotenv.config();
    const config = {
        "port": process.env.PORT || 3000,
        "db": {
            "host": process.env.DBHOST || "localhost",
            "port": process.env.DBPORT || 5432,
            "database": process.env.DBNAME || "todo",
            "user": process.env.USER || "root",
            "password": process.env.PASSWORD || "root"
        },
        "defAdmin": {
            "username": process.env.DEFADMINUSER || "admin",
            "password": process.env.DEFADMINPASS || "admin123",
            "email": process.env.DEFADMINEMAIL || "admin@gmail.com",
            "type": "admin",
            "createdat": new Date().toISOString()
        }
    };
    return config;
}