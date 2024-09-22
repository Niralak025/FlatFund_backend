const { Sequelize, DataTypes, QueryInterface } = require('sequelize');
const sequelize = new Sequelize('nodedemodatabase', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const UserTransactionData = sequelize.define('user_transactions_data', {
    transactionID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expenseDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    expenseType: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    paymentMethod: {
        type: DataTypes.STRING(50)
    },
    // createdAt: {
    //     type: DataTypes.TIMESTAMP,
    //     defaultValue: DataTypes.NOW
    // },
    // updatedAt: {
    //     type: DataTypes.TIMESTAMP,
    //     defaultValue: DataTypes.NOW,
    //     onUpdate: DataTypes.NOW
    // }
}, {
    // createdAt: 'CreatedAt',  // Map to your actual column name
    // updatedAt: 'UpdatedAt',
    sequelize,
    tableName: 'user_transactions_data',
    timestamps: false // Set to true if you want Sequelize to handle timestamps automatically
});

sequelize.sync()
    .then(() => console.log('user_transactions_data table created successfully'))
    .catch(err => console.error('Error creating table:', err));

module.exports = UserTransactionData