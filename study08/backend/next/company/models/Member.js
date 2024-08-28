const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 데이터베이스 설정 파일을 import

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
    birth: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING },
    addr1: { type: DataTypes.STRING },
    addr2: { type: DataTypes.STRING },
    postcode: { type: DataTypes.STRING },
    regdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'member',
    timestamps: false
});

module.exports = Member;