import dotenv from 'dotenv';
export default function() {
    dotenv.config();
    const config = {
        "port": process.env.PORT || 3000,
        "db": {
            "host": process.env.DBHOST || "localhost",
            "port": process.env.DBPORT || 3306,
            "database": process.env.DBNAME || "todo",
            "user": process.env.DBUSER || "root",
            "password": process.env.DBPASSWORD || ""
        }
    };
    return config;
}