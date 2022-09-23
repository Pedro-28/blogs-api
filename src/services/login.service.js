const { User } = require('../models');
const generateError = require('../utils/generateError');
const generateToken = require('../utils/generateToken');

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const errorMessage = generateError(400, 'Invalid fields');
    throw errorMessage;
  }

  const token = generateToken(user.dataValues);
  return token;
};

module.exports = {
  login,
};
