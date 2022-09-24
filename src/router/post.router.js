const express = require('express');
const { postController } = require('../controllers');
const { tokenValidation, postValidation } = require('../middlewares');

const router = express.Router();

router.get('/:id', tokenValidation, postController.getBlogPostById);

router.get('/', tokenValidation, postController.getAllBlogPosts);

router.post('/', tokenValidation, postValidation, postController.insertBlogPost);

module.exports = router;
