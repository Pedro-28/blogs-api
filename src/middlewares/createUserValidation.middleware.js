const generateError = require('../utils/generateError');
const { userSchema } = require('./validations/schemas');

const createUserValidation = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const errorMessage = generateError(400, error.message);
    next(errorMessage);
  }

  next();
};

module.exports = createUserValidation;
