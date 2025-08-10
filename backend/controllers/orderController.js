import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingData, subtotal, shipping, tax, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingData,
      subtotal,
      shipping,
      tax,
      total,
    });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
    });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};
