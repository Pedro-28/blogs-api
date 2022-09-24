const { userService } = require('../services');

const insertUser = async (req, res, next) => {
  try {
    const token = await userService.insertUser(req.body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertUser,
  getAllUsers,
};
