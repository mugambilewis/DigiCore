const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { generateReceipt } = require('../utils/receiptGenerator');
const { sendReceiptEmail } = require('../utils/emailService');
const { convertUSDTtoKES } = require('../utils/currencyConverter');

// Create order with receipt generation
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingData, subtotal, shipping, tax, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    // Convert prices to KES if needed (assuming prices come in USDT)
    const subtotalKES = convertUSDTtoKES(subtotal);
    const shippingKES = convertUSDTtoKES(shipping);
    const taxKES = convertUSDTtoKES(tax);
    const totalKES = convertUSDTtoKES(total);

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      subtotal: subtotalKES,
      shipping: shippingKES,
      tax: taxKES,
      total: totalKES,
      shippingData,
      status: 'pending',
    });

    // Create order items
    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: convertUSDTtoKES(item.price),
      quantity: item.qty || item.quantity,
    }));

    await OrderItem.createMany(orderItems);

    // Generate receipt
    let receiptLink = null;
    try {
      const receiptData = {
        orderId: order.id,
        items: orderItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingData,
        subtotal: subtotalKES,
        shipping: shippingKES,
        tax: taxKES,
        total: totalKES,
        createdAt: order.created_at,
      };

      receiptLink = await generateReceipt(receiptData);

      // Update order with receipt link
      await Order.update(order.id, { receiptLink, isPaid: true, paidAt: new Date(), status: 'completed' });
    } catch (receiptError) {
      console.error('Receipt generation error:', receiptError);
      // Continue even if receipt generation fails
    }

    // Send receipt email (optional, don't fail if email fails)
    try {
      if (receiptLink && req.user.email) {
        await sendReceiptEmail(req.user.email, receiptLink, order.id);
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order.id,
      receiptLink,
    });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user.id);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Get orders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is admin
    if (order.user_id !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error('Get order error:', err);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};
