const express = require('express');
const { userController } = require('../controllers');
const { createUserValidation, tokenValidation } = require('../middlewares');

const router = express.Router();

router.post('/', createUserValidation, userController.insertUser);

router.get('/', tokenValidation, userController.getAllUsers);

module.exports = router;
