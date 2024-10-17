const { connection } = require("../db/db");
const userTransactionsTable = require("../models/TransactionTable");

// Controller function to add a room expanse
const addExpense = async (req, res) => {
    userTransactionsTable
    try {
        const { userID, expenseDate, amount, expenseType, description, paymentMethod } = req.body;
        const queryInsertTransactionData = `INSERT INTO user_transactions_data (user_id, expense_date, expense_category, expense_price, payment_method, expense_description) VALUES (?, ?, ?, ?, ?, ?)`;
        connection.execute(
            queryInsertTransactionData,
            [userID, expenseDate, expenseType, amount, paymentMethod, description],
            (error, results) => {

                if (error) {
                    console.error('Error inserting data in Transaction table', error);
                    return res.status(500).json({ msg: 'Database query error' });
                }
                res.status(200).json({ msg: 'Transaction added successfully' });
            }
        );
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getUserAllExpanse = async (req, res) => {
    const userId = req.params.id;
    try {
        const findUserTransactionsDataQuery = `SELECT * FROM user_transactions_data WHERE user_id = ?`;
        connection.execute(findUserTransactionsDataQuery, [userId], (error, results) => {
            if (error) {
                return res.status(500).json({ msg: 'Database query error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ msg: 'Not found' });
            }
            const userTransactionsData = results
            res.status(200).json({ msg: 'User transactions data', transactions_data: userTransactionsData });
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

const updateExpanseById = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const { expenseDate, expenseType, amount, paymentMethod, description } = req.body;
        const updateExpanseQuery = `UPDATE user_transactions_data SET expense_date = ?, expense_category = ?, expense_price = ?, payment_method = ?, expense_description = ? WHERE id = ?`;
        connection.execute(
            updateExpanseQuery,
            [expenseDate, expenseType, amount, paymentMethod, description, transactionId],
            (error, results) => {
                if (error) {
                    console.log("error", error);

                    return res.status(500).json({ msg: 'Database query error' });
                }
                return res.status(200).json({ msg: 'Transaction updated successfully', data: results })
            }
        )
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

const deleteExpanseById = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const deleteExpanseQuery = `DELETE FROM user_data WHERE id = ?`;
        connection.execute(
            deleteExpanseQuery,
            [transactionId],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: 'Database query error' });
                }
                return res.status(200).json({ msg: 'Transaction deleted successfully' })
            }
        )
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

const getAllUsersExpanses = async (req, res) => {
    try {
        const allExpanseQuery = `SELECT * FROM user_transactions_data`;
        connection.execute(
            allExpanseQuery,
            (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: 'Database query error' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ msg: 'Not found' });
                }
                return res.status(200).json({ msg: 'success', data: results })
            }
        )
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
}


module.exports = { addExpense, getUserAllExpanse, updateExpanseById, deleteExpanseById, getAllUsersExpanses }
