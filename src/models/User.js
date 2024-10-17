const db = require('../db/db');

const userTable =
    `CREATE TABLE IF NOT EXISTS user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    profile_picture VARCHAR(255) DEFAULT NULL
)`;

// This ensures the table is created in the database if it doesn't exist
db.connection.execute(userTable, (error, results) => {
    if (error) {
        console.error('Error creating user_data table:', error);
    } else {
        console.log('user_data table created or already exists.');
    }
})
module.exports = userTable;
