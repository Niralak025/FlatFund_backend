// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodedemodatabase', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
