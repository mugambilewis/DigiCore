// controllers/adminController.js

const User = require('../models/User');
const Order = require('../models/Order');

// GET /api/admin/users - Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/orders - Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/admin/stats - Get sales statistics
const getStats = async (req, res) => {
  try {
    const stats = await Order.getSalesStats();
    const userCount = (await User.findAll()).length;
    
    res.status(200).json({
      ...stats,
      total_users: userCount,
    });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getAllOrders,
  getStats,
};
