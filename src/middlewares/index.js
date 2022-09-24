const loginValidation = require('./loginValidation.middleware');
const createUserValidation = require('./createUserValidation.middleware');
const errorMiddleware = require('./error.middleware');
const tokenValidation = require('./tokenValidation.middleware');

module.exports = {
  loginValidation,
  errorMiddleware,
  createUserValidation,
  tokenValidation,
};
