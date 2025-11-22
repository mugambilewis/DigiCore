const { query } = require('../config/db');

// User model using PostgreSQL
class User {
  // Find user by email
  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  // Find user by ID
  static async findById(id) {
    const result = await query('SELECT id, name, email, is_admin, created_at, updated_at FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Create new user
  static async create({ name, email, password, isAdmin = false }) {
    const result = await query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, name, email, is_admin, created_at, updated_at',
      [name, email, password, isAdmin]
    );
    return result.rows[0];
  }

  // Update user
  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name) {
      fields.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }
    if (updates.email) {
      fields.push(`email = $${paramCount++}`);
      values.push(updates.email);
    }
    if (updates.password) {
      fields.push(`password = $${paramCount++}`);
      values.push(updates.password);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const result = await query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, name, email, is_admin, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  }

  // Get all users (for admin)
  static async findAll() {
    const result = await query('SELECT id, name, email, is_admin, created_at, updated_at FROM users ORDER BY created_at DESC');
    return result.rows;
  }
}

module.exports = User;
