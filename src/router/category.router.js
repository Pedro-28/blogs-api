const express = require('express');
const { categoryController } = require('../controllers');
const { tokenValidation, categoryValidation } = require('../middlewares');

const router = express.Router();

router.post('/', tokenValidation, categoryValidation, categoryController.insertCategory);

module.exports = router;
