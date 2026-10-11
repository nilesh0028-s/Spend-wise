const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  date: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  month: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
