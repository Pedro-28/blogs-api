const { categoryService } = require('../services');

const insertCategory = async (req, res, next) => {
  try {
    const category = await categoryService.insertCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insertCategory,
  getAllCategories,
};
