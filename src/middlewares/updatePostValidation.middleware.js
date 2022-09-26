const generateError = require('../utils/generateError');
const { updatePostSchema } = require('./validations/schemas');

const updatePostValidation = (req, _res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    const errorMessage = generateError(400, 'Some required fields are missing');
    return next(errorMessage);
  }

  const { error } = updatePostSchema.validate({ title, content });

  if (error) {
    const errorMessage = generateError(400, error.message);
    return next(errorMessage);
  }

  next();
};

module.exports = updatePostValidation;
