const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dataroom = sequelize.define('Dataroom', {
    dno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    author: { type: DataTypes.STRING },
    datafile: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'dataroom',
    timestamps: false
});

module.exports = Dataroom;