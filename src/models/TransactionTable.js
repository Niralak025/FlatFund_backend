// const sequelize = require('../../config/database');
// const database = require('../db/db')

// const createUserTransactionDataTable = `
//     CREATE TABLE IF NOT EXISTS user_transactions_data (
//         transactionID INT AUTO_INCREMENT PRIMARY KEY,
//         userID INT NOT NULL,
//         expenseDate DATETIME NOT NULL,
//         amount DECIMAL(10, 2) NOT NULL,
//         expenseType VARCHAR(50) NOT NULL,
//         description TEXT,
//         paymentMethod VARCHAR(50),
//         CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//         FOREIGN KEY (userID) REFERENCES user_data(id)
//     );
// `;

// database.query(createUserTransactionDataTable, (err, results) => {
//     if (err) {
//         console.error('Error creating user_transactions_data table:', err);
//     } else {
//         console.log('user_transactions_data table created successfully.', results);
//     }
// });

// // This ensures the table is created in the database if it doesn't exist
// database.sync()
//     .then(() => console.log('user_transactions_data table created successfully'))
//     .catch(err => console.error('Error creating table:', err));