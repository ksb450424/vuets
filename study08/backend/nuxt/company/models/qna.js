module.exports = (sequelize, DataTypes) => {
    const Qna = sequelize.define('Qna', {
      qno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      lev: { type: DataTypes.INTEGER, defaultValue: 0 },
      parno: { type: DataTypes.INTEGER, allowNull: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      hits: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
      tableName: 'qna',
      timestamps: false
    });
    return Qna;
  };