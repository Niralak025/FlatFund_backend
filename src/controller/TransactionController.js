const getUserTransactionModel = require('../models/GetUserAllTransactionsModel');
const UserTransactionData = require('../models/TransactionModel');
// const TransactionModel = require('../models/TransactionModel')

// Controller function to add a room expanse
const addExpense = async (req, res) => {

    try {
        const { userID, expenseDate, amount, expenseType, description, paymentMethod } = req.body;
        console.log("req.body=============", req.body);
        const newTransaction = await UserTransactionData.create({
            userID,
            expenseDate,
            amount,
            expenseType,
            description,
            paymentMethod
        });

        console.log("newTransaction================", newTransaction);


        res.status(200).json({ message: 'Transaction added successfully', newTransaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserAllExpanse = async (req, res) => {
    const userId = req.body.userId;
    try {
        const userTransactionsData = await getUserTransactionModel.GetUserAllTransactionsModel(userId)
        return res.status(200).json({
            header: {
                status: 200,
                message: "success"
            },
            status: 200,
            message: "success",
            data: userTransactionsData
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addExpense, getUserAllExpanse }
