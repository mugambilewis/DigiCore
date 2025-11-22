const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  requestPasswordReset,
  verifyOTP,
  updatePassword,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMe);
router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset/verify', verifyOTP);
router.post('/password-reset/update', updatePassword);

module.exports = router;
