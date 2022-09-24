const express = require('express');
const { postController } = require('../controllers');
const { tokenValidation, postValidation } = require('../middlewares');

const router = express.Router();

router.post('/', tokenValidation, postValidation, postController.insertBlogPost);

module.exports = router;
