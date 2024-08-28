module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
      id: { type: DataTypes.STRING, primaryKey: true },
      pw: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      birth: { type: DataTypes.DATE, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      tel: { type: DataTypes.STRING, allowNull: true },
      addr1: { type: DataTypes.STRING, allowNull: true },
      addr2: { type: DataTypes.STRING, allowNull: true },
      postcode: { type: DataTypes.STRING, allowNull: true },
      regdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
      tableName: 'member',
      timestamps: false
    });
    return Member;
  };