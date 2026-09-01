const express = require('express');
const router = express.Router();
const { saveBudget, getBudget } = require('../controllers/budgetController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, saveBudget);
router.get('/', protect, getBudget);

module.exports = router;
