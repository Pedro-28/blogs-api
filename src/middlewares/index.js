const loginValidation = require('./loginValidation.middleware');
const createUserValidation = require('./createUserValidation.middleware');
const errorMiddleware = require('./error.middleware');

module.exports = {
  loginValidation,
  errorMiddleware,
  createUserValidation,
};
