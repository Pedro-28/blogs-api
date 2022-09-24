const generateError = require('../utils/generateError');
const { categorySchema } = require('./validations/schemas');

const categoryValidation = (req, _res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });

  if (error) {
    const errorMessage = generateError(400, error.message);
    next(errorMessage);
  }

  next();
};

module.exports = categoryValidation;
