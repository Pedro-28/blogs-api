const Joi = require('joi');

const loginFieldMessage = 'Invalid fields';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Some required fields are missing',
    'any.empty': 'Some required fields are missing',
    'any.email': loginFieldMessage,
    'any.string': loginFieldMessage,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Some required fields are missing',
    'any.empty': 'Some required fields are missing',
    'any.string': loginFieldMessage,
    'string.min': loginFieldMessage,
  }),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  loginSchema,
  userSchema,
  categorySchema,
};
