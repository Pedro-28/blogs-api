const { postService } = require('../services');

const insertBlogPost = async (req, res, next) => {
  try {
    const blogPost = await postService.insertBlogPost(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    next(error);
  }
};

const getAllBlogPosts = async (_req, res, next) => {
  try {
    const blogPosts = await postService.getAllBlogPosts();
    res.status(200).json(blogPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertBlogPost,
  getAllBlogPosts,
};