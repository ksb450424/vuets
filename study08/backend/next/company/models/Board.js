// company/backend/models/board.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Board = sequelize.define('Board', {
  no: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'board',
  timestamps: false
});

module.exports = Board;