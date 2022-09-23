const { User } = require('../models');
const generateError = require('../utils/generateError');
const generateToken = require('../utils/generateToken');

const insertUser = async ({ displayName, email, password, image }) => {
  const idRegistered = await User.findOne({ where: { email } });

  if (idRegistered) {
    const errorMessage = generateError(409, 'User already registered');
    throw errorMessage;
  }

  const user = await User.create({ displayName, email, password, image });

  const token = generateToken(user.dataValues);
  return token;
};

module.exports = {
  insertUser,
};
