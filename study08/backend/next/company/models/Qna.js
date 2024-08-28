const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Qna = sequelize.define('Qna', {
    qno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lev: { type: DataTypes.INTEGER, defaultValue: 0 },
    parno: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    author: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'qna',
    timestamps: false
});

module.exports = Qna;