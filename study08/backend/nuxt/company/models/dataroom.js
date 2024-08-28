module.exports = (sequelize, DataTypes) => {
    const Dataroom = sequelize.define('Dataroom', {
      dno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      datafile: { type: DataTypes.STRING, allowNull: true },
      resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      hits: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
      tableName: 'dataroom',
      timestamps: false
    });
    return Dataroom;
  };