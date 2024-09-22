const { Sequelize, DataTypes, QueryInterface } = require('sequelize');
const sequelize = new Sequelize('nodedemodatabase', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('user_data', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// This ensures the table is created in the database if it doesn't exist
sequelize.sync()
    .then(() => console.log('user_data table created successfully'))
    .catch(err => console.error('Error creating table:', err));

module.exports = User;
