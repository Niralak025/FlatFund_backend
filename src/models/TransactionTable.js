const db = require('../db/db');

const userTransactionsTable = `CREATE TABLE IF NOT EXISTS user_transactions_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    expense_date DATE NOT NULL,
    expense_category VARCHAR(255) NOT NULL,
    expense_price DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    expense_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_data(id)
)`;

// This ensures the table is created in the database if it doesn't exist
db.connection.execute(userTransactionsTable, (error, results) => {
    if (error) {
        console.error('Error creating user_transactions_data table:', error);
    } else {
        console.log('user_transactions_data table created or already exists.');
    }
})

module.exports = userTransactionsTable;