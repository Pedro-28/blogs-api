const generateError = require('../utils/generateError');
const { loginSchema } = require('./validations/schemas');

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const errorMessage = generateError(400, 'Some required fields are missing');
    next(errorMessage);
  }

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    const errorMessage = generateError(400, error.message);
    next(errorMessage);
  }

  next();
};

module.exports = loginValidation;
