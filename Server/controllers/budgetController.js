const Budget = require('../models/Budget');

const saveBudget = async (req, res) => {
  const { totalBudget, categories } = req.body;
  const month = new Date().toISOString().slice(0, 7);
  try {
    const existing = await Budget.findOne({ userId: req.user.id, month });
    if (existing) {
      existing.totalBudget = totalBudget;
      existing.categories = categories;
      await existing.save();
      return res.json(existing);
    }
    const budget = await Budget.create({ userId: req.user.id, month, totalBudget, categories });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBudget = async (req, res) => {
  const month = new Date().toISOString().slice(0, 7);
  try {
    const budget = await Budget.findOne({ userId: req.user.id, month });
    if (!budget) return res.status(404).json({ message: 'No budget found' });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveBudget, getBudget };
