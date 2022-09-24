require('dotenv').config();
const Sequelize = require('sequelize');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);
const { BlogPost, PostCategory, Category } = require('../models');
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

module.exports = {
  insertBlogPost,
};
