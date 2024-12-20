const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new user
router.post('/', (req, res) => {
    const { role, username, password, nohp } = req.body;
    const sql = 'INSERT INTO User (role, username, password, nohp) VALUES (?, ?, ?, ?)';
    db.query(sql, [role, username, password, nohp], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, role, username, nohp });
    });
});

// Update a user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { role, username, password, nohp } = req.body;
    const sql = 'UPDATE User SET role = ?, username = ?, password = ?, nohp = ? WHERE user_id = ?';
    db.query(sql, [role, username, password, nohp, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User  updated successfully' });
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM User WHERE user_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User  deleted successfully' });
    });
});

module.exports = router;