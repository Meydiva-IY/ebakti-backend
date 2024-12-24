// medicalHistoryController.js
const db = require('../config/db');

const medicalHistoryController = {
  create: async (req, res) => {
    try {
      const { disease_name, description } = req.body;
      const user_id = req.user.id;
      
      const [result] = await db.query(
        'INSERT INTO medical_history (user_id, disease_name, description) VALUES (?, ?, ?)',
        [user_id, disease_name, description]
      );
      
      res.status(201).json({
        message: 'Medical history added successfully',
        id: result.insertId
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUserId: async (req, res) => {
    try {
      const [history] = await db.query(
        `SELECT mh.*, u.name as user_name 
         FROM medical_history mh
         JOIN user u ON mh.user_id = u.user_id
         WHERE mh.user_id = ?`,
        [req.params.userId]
      );
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { disease_name, description } = req.body;
      const { id } = req.params;
      
      const [result] = await db.query(
        'UPDATE medical_history SET disease_name = ?, description = ? WHERE medical_history_id = ? AND user_id = ?',
        [disease_name, description, id, req.user.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Medical history not found or unauthorized' });
      }
      
      res.json({ message: 'Medical history updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const [result] = await db.query(
        'DELETE FROM medical_history WHERE medical_history_id = ? AND user_id = ?',
        [req.params.id, req.user.id]
      );
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Medical history not found or unauthorized' });
      }
      
      res.json({ message: 'Medical history deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = medicalHistoryController;
