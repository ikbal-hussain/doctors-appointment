
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sqlConfig"); 

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "patient" },
});

module.exports = User;
