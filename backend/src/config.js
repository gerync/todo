import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        name: process.env.DBNAME || 'todo',
        host: process.env.DBHOST || 'localhost',
        user: process.env.DBUSER || 'root',
        password: process.env.DBPASSWORD || '',
        port: process.env.DBPORT || 3306
    },
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWTSECRET || 'supersecretkey',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    baseadmin: {
        username: process.env.BASEADMIN_USERNAME || 'admin',
        email: process.env.BASEADMIN_EMAIL || 'admin@example.com',
        password: process.env.BASEADMIN_PASSWORD || 'adminpass123',
        birthdate: process.env.BASEADMIN_BIRTHDATE || '1990-01-01'
    }
};

export default config;