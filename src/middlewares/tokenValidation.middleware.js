const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateError = require('../utils/generateError');

const secret = process.env.JWT_SECRET;

const tokenValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const errorMessage = generateError(401, 'Token not found');
    return next(errorMessage);
  }

  try {
    const data = jwt.verify(authorization, secret);
    req.payload = data;
    next();
  } catch (error) {
    const errorMessage = generateError(401, 'Expired or invalid token');
    next(errorMessage);
  }
};

module.exports = tokenValidation;