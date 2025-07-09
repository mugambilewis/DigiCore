const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');

// Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMe); // To get current logged-in user

module.exports = router;
