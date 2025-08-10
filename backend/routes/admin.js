const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin route to get all users
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
