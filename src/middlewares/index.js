const loginValidation = require('./loginValidation.middleware');
const errorMiddleware = require('./error.middleware');

module.exports = {
  loginValidation,
  errorMiddleware,
};
