require('dotenv').config();
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,  // Replace with your database host
    user: process.env.DB_USERNAME,  // Replace with your MySQL username
    password: process.env.DB_PASSWORD,  // Replace with your MySQL password
    database: process.env.DB_NAME  // Replace with your database name
});

async function connectDatabase() {
    // Connect to the database
    connection.connect((error) => {
        if (error) {
            console.error('Error connecting to the database:', error);
            return;
        }
        else {
            console.log('Connected to the MySQL database!');
        }
    });
}

module.exports = {
    connectDatabase,
    connection
};