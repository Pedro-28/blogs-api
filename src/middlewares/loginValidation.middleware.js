const { loginSchema } = require('./validations/schemas');

const loginValidation = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({ status: 400, message: 'Some required fields are missing' });
  }

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    next({ status: 400, message: error.message });
  }

  next();
};

module.exports = loginValidation;
