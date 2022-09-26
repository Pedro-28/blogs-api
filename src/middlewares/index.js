const loginValidation = require('./loginValidation.middleware');
const createUserValidation = require('./createUserValidation.middleware');
const errorMiddleware = require('./error.middleware');
const tokenValidation = require('./tokenValidation.middleware');
const categoryValidation = require('./categoryValidation.middleware');
const postValidation = require('./postValidation.middleware');
const updatePostValidation = require('./updatePostValidation.middleware');

module.exports = {
  loginValidation,
  errorMiddleware,
  createUserValidation,
  tokenValidation,
  categoryValidation,
  postValidation,
  updatePostValidation,
};
