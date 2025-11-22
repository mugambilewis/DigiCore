const { query } = require('../config/db');

// OrderItem model using PostgreSQL
class OrderItem {
  // Create order items (bulk insert)
  static async createMany(orderItems) {
    if (!orderItems || orderItems.length === 0) return [];

    const values = [];
    const placeholders = [];
    let paramCount = 1;

    orderItems.forEach((item) => {
      placeholders.push(`($${paramCount++}, $${paramCount++}, $${paramCount++}, $${paramCount++}, $${paramCount++}, $${paramCount++})`);
      values.push(item.orderId, item.productId, item.name, item.image || null, item.price, item.quantity);
    });

    const result = await query(
      `INSERT INTO order_items (order_id, product_id, name, image, price, quantity)
       VALUES ${placeholders.join(', ')}
       RETURNING *`,
      values
    );
    return result.rows;
  }

  // Find order items by order ID
  static async findByOrderId(orderId) {
    const result = await query(
      'SELECT * FROM order_items WHERE order_id = $1 ORDER BY created_at',
      [orderId]
    );
    return result.rows;
  }
}

module.exports = OrderItem;

