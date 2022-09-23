const express = require('express');
const { userController } = require('../controllers');
const { createUserValidation } = require('../middlewares');

const router = express.Router();

router.post('/', createUserValidation, userController.insertUser);

module.exports = router;
