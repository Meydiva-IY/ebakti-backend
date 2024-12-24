// userController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { email, password, name, gender, date_of_birth, student_id, department, address } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await db.query(
        `INSERT INTO user (role, email, password, name, gender, date_of_birth, student_id, department, address) 
         VALUES ('peserta', ?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, hashedPassword, name, gender, date_of_birth, student_id, department, address]
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const [users] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
      
      if (!users[0] || !await bcrypt.compare(password, users[0].password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: users[0].user_id, role: users[0].role }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { ...users[0], password: undefined } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
    userController
  };