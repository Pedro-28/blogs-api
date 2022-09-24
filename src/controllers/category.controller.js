const { categoryService } = require('../services');

const insertCategory = async (req, res, next) => {
  try {
    const category = await categoryService.insertCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertCategory,
};
