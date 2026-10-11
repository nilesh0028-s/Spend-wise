const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

const addExpense = async (req, res) => {
  const { category, amount, description, date, paymentMethod } = req.body;
  const month = new Date().toISOString().slice(0, 7);

  try {
    // Step 1 — save the expense
    const expense = await Expense.create({
      userId: req.user.id,
      category,
      amount,
      description,
      date,
      paymentMethod,
      month,
    });

    // Step 2 — find this month's budget and increment spentAmount for that category
    const budget = await Budget.findOne({ userId: req.user.id, month });
    if (budget) {
      const cat = budget.categories.find(c => c.name === category);
      if (cat) {
        cat.spentAmount += amount;
        await budget.save();
      }
    }

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  const month = new Date().toISOString().slice(0, 7);
  try {
    const expenses = await Expense.find({ userId: req.user.id, month }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getExpenses };
