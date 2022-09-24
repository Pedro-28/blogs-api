const { postService } = require('../services');

const insertBlogPost = async (req, res, next) => {
  try {
    const blogPost = await postService.insertBlogPost(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertBlogPost,
};
