// controllers/adminController.js

const User = require('../models/userModel'); // Adjust path if needed

// GET /api/admin/users - Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send password
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
};
