require('dotenv').config();
const Sequelize = require('sequelize');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);
const { BlogPost, PostCategory, Category, User } = require('../models');
const generateError = require('../utils/generateError');

const insertBlogPost = async ({ title, content, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, userId: 1 }, { transaction: t });

    const categories = await Promise.all(categoryIds.map(async (id) => (
      Category.findByPk(id)
    )));

    if (categories.includes(null)) {
      const errorMessage = generateError(400, '"categoryIds" not found');
      throw errorMessage;
    }

    await Promise.all(categoryIds.map(async (id) => (
      PostCategory.create({ postId: post.id, categoryId: id }, { transaction: t })
    )));

    return post;
  });
  return result;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return blogPosts;
};

module.exports = {
  insertBlogPost,
  getAllBlogPosts,
};
