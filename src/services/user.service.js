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

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    const errorMessage = generateError(404, 'User does not exist');
    throw errorMessage;
  }

  return user;
};

const deleteUser = async (payload) => (
  User.destroy({ where: { id: payload.id } })
);

module.exports = {
  insertUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
