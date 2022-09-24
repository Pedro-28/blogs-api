module.exports = (sequelize, DataTypes) => {
  const categoryTable = sequelize.define('Category',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'categories',
      underscored: true,
      timestamps: false,
    });
  return categoryTable;
};
