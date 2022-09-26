const generateError = require('../utils/generateError');
const { postSchema } = require('./validations/schemas');

const postValidation = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    const errorMessage = generateError(400, 'Some required fields are missing');
    return next(errorMessage);
  }

  const { error } = postSchema.validate({ title, content, categoryIds });

  if (error) {
    const errorMessage = generateError(400, error.message);
    return next(errorMessage);
  }

  next();
};

module.exports = postValidation;
