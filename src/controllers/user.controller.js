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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.payload);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
