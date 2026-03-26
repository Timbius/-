const pool = require('../config/db');

class User {
  // Найти пользователя по email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Найти пользователя по ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT id, name, email, role, createdAt FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Создать нового пользователя
  static async create({ name, email, passwordHash }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return result.insertId;
  }
}

module.exports = User;