const express = require('express');
const { userController } = require('../controllers');
const { createUserValidation, tokenValidation } = require('../middlewares');

const router = express.Router();

router.get('/:id', tokenValidation, userController.getUserById);

router.get('/', tokenValidation, userController.getAllUsers);

router.post('/', createUserValidation, userController.insertUser);

module.exports = router;
