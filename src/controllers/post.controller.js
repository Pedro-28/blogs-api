const { postService } = require('../services');

const insertBlogPost = async (req, res, next) => {
  try {
    const blogPost = await postService.insertBlogPost(req.body, req.payload);
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

const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogPost = await postService.getBlogPostById(id);
    res.status(200).json(blogPost);
  } catch (error) {
    next(error);
  }
};

const updateBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogPost = await postService.updateBlogPost(id, req.payload, req.body);
    res.status(200).json(blogPost);
  } catch (error) {
    next(error);
  }
};

const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.deleteBlogPost(id, req.payload);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const searchBlogPost = async (req, res, next) => {
  try {
    const { q } = req.query;
    const blogPosts = await postService.searchBlogPost(q);
    res.status(200).json(blogPosts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  searchBlogPost,
};
