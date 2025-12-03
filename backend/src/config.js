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
        }
    };
    return config;
}