CREATE DATABASE IF NOT EXISTS todo;
CHARACTER SET utf8
DEFAULT COLLATE utf8_hungarian_ci;
USE todo;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwordhash VARCHAR(255) NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    birthdate DATE,
    email VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('admin', 'user', 'suspended') DEFAULT 'user'
);
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    chategory VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    iscompleted BOOLEAN DEFAULT FALSE,
    dueto DATE,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
