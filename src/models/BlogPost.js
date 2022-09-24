module.exports = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      published: {
        type: DataTypes.DATE,
      },
      updated: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    });

  blogPostTable.associate = ({ User }) => {
    blogPostTable.belongsTo(User, { foreignKey: 'userId', as: 'users' });
  };

  return blogPostTable;
};
