// config/sqlConfig.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'mysql', // Ensure the dialect is set to 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (error) {
        console.error('SQL connection error:', error);
    }
};

module.exports = { sequelize, testConnection }; // Export the sequelize instance
