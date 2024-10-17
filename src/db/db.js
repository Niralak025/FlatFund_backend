const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',  // Replace with your database host
    user: 'root',  // Replace with your MySQL username
    password: '',  // Replace with your MySQL password
    database: 'flatfunddb'  // Replace with your database name
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