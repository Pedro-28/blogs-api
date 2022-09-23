require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const generateError = require('../utils/generateError');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    const errorMessage = generateError(400, 'Invalid fields');
    throw errorMessage;
  }

  const token = jwt.sign(user.dataValues, secret, jwtConfig);
  return token;
};

module.exports = {
  login,
};
