const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all notifications
router.get('/', (req, res) => {
    db.query('SELECT * FROM Notification', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new notification
router.post('/', (req, res) => {
    const { user_id, message, is_read } = req.body;
    const sql = 'INSERT INTO Notification (user_id, message, is_read) VALUES (?, ?, ?)';
    db.query(sql, [user_id, message, is_read], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, user_id, message, is_read });
    });
});

// Update a notification
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, message, is_read } = req.body;
    const sql = 'UPDATE Notification SET user_id = ?, message = ?, is_read = ? WHERE notification_id = ?';
    db.query(sql, [user_id, message, is_read, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Notification updated successfully' });
    });
});

// Delete a notification
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Notification WHERE notification_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Notification deleted successfully' });
    });
});

module.exports = router;