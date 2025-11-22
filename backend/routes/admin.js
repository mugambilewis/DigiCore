const express = require('express');
const router = express.Router();
const { getAllUsers, getAllOrders, getStats } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin routes
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/orders', protect, adminOnly, getAllOrders);
router.get('/stats', protect, adminOnly, getStats);

module.exports = router;
