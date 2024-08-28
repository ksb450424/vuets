const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    pno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cate: { type: DataTypes.STRING },
    pname: { type: DataTypes.STRING },
    pcontent: { type: DataTypes.TEXT },
    img1: { type: DataTypes.STRING },
    img2: { type: DataTypes.STRING },
    img3: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'product',
    timestamps: false
});

module.exports = Product;