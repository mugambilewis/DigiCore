const { query } = require('../config/db');

// Order model using PostgreSQL
class Order {
  // Create new order
  static async create({ userId, subtotal, shipping, tax, total, shippingData, receiptLink, status = 'pending' }) {
    const result = await query(
      `INSERT INTO orders (user_id, subtotal, shipping, tax, total, shipping_data, receipt_link, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [userId, subtotal, shipping, tax, total, JSON.stringify(shippingData || {}), receiptLink, status]
    );
    return result.rows[0];
  }

  // Find order by ID
  static async findById(id) {
    const result = await query(
      `SELECT o.*, 
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', oi.id,
                    'product_id', oi.product_id,
                    'name', oi.name,
                    'image', oi.image,
                    'price', oi.price,
                    'quantity', oi.quantity
                  )
                ) FILTER (WHERE oi.id IS NOT NULL),
                '[]'::json
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = $1
       GROUP BY o.id`,
      [id]
    );
    return result.rows[0] || null;
  }

  // Find orders by user ID
  static async findByUserId(userId) {
    const result = await query(
      `SELECT o.*, 
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', oi.id,
                    'product_id', oi.product_id,
                    'name', oi.name,
                    'image', oi.image,
                    'price', oi.price,
                    'quantity', oi.quantity
                  )
                ) FILTER (WHERE oi.id IS NOT NULL),
                '[]'::json
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  // Get all orders (for admin)
  static async findAll() {
    const result = await query(
      `SELECT o.*, 
              u.name as user_name,
              u.email as user_email,
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', oi.id,
                    'product_id', oi.product_id,
                    'name', oi.name,
                    'image', oi.image,
                    'price', oi.price,
                    'quantity', oi.quantity
                  )
                ) FILTER (WHERE oi.id IS NOT NULL),
                '[]'::json
              ) as items
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id, u.name, u.email
       ORDER BY o.created_at DESC`
    );
    return result.rows;
  }

  // Update order
  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.status) {
      fields.push(`status = $${paramCount++}`);
      values.push(updates.status);
    }
    if (updates.isPaid !== undefined) {
      fields.push(`is_paid = $${paramCount++}`);
      values.push(updates.isPaid);
    }
    if (updates.paidAt) {
      fields.push(`paid_at = $${paramCount++}`);
      values.push(updates.paidAt);
    }
    if (updates.receiptLink) {
      fields.push(`receipt_link = $${paramCount++}`);
      values.push(updates.receiptLink);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const result = await query(
      `UPDATE orders SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  // Get sales statistics (for admin)
  static async getSalesStats() {
    const result = await query(
      `SELECT 
        COUNT(*) as total_orders,
        SUM(total) as total_sales,
        SUM(CASE WHEN is_paid = true THEN total ELSE 0 END) as paid_sales,
        AVG(total) as average_order_value
       FROM orders`
    );
    return result.rows[0] || { total_orders: 0, total_sales: 0, paid_sales: 0, average_order_value: 0 };
  }
}

module.exports = Order;
