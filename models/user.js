// models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sqlConfig'); // Use destructuring to import the sequelize instance

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'patient' }
});

module.exports = User;
