const { userService } = require('../services');

const insertUser = async (req, res, next) => {
  try {
    const token = await userService.insertUser(req.body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertUser,
};
