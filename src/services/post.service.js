require('dotenv').config();
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const config = require('../config/config');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);
const { BlogPost, PostCategory, Category, User } = require('../models');
const generateError = require('../utils/generateError');

const insertBlogPost = async ({ title, content, categoryIds }, payload) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, userId: payload.id }, { transaction: t });

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

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) {
    const errorMessage = generateError(404, 'Post does not exist');
    throw errorMessage;
  }

  return blogPost;
};

const updateBlogPost = async (id, payload, { title, content }) => {
  const blogPost = await BlogPost.findByPk(id);

  if (!blogPost) {
    const errorMessage = generateError(404, 'Post does not exist');
    throw errorMessage;
  }

  if (blogPost.userId !== payload.id) {
    const errorMessage = generateError(401, 'Unauthorized user');
    throw errorMessage;
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedBlogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedBlogPost;
};

const deleteBlogPost = async (id, payload) => {
  const blogPost = await BlogPost.findByPk(id);

  if (!blogPost) {
    const errorMessage = generateError(404, 'Post does not exist');
    throw errorMessage;
  }

  if (blogPost.userId !== payload.id) {
    const errorMessage = generateError(401, 'Unauthorized user');
    throw errorMessage;
  }

  await BlogPost.destroy({ where: { id } });
};

const searchBlogPost = async (search) => {
  const blogPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: search } },
        { content: { [Op.substring]: search } },
      ],
    },
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
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  searchBlogPost,
};
