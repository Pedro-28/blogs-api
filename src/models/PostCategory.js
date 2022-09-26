module.exports = (sequelize, DataTypes) => {
  const blogPostTable = sequelize.define('PostCategory',
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      categoryId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false,
    });

  blogPostTable.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPosts',
      through: blogPostTable,
    });

    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
      through: blogPostTable,
    });
  };

  return blogPostTable;
};
