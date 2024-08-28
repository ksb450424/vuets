module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      pno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      cate: { type: DataTypes.STRING, allowNull: false },
      pname: { type: DataTypes.STRING, allowNull: false },
      pcontent: { type: DataTypes.TEXT, allowNull: false },
      img1: { type: DataTypes.STRING, allowNull: true },
      img2: { type: DataTypes.STRING, allowNull: true },
      img3: { type: DataTypes.STRING, allowNull: true },
      resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      hits: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
      tableName: 'product',
      timestamps: false
    });
    return Product;
  };