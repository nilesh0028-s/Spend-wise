const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String },
  color: { type: String },
  allocatedAmount: { type: Number, required: true, default: 0 },
});

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  categories: [categorySchema],
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
