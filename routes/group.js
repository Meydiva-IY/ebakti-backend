const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all groups
router.get('/', (req, res) => {
    db.query('SELECT * FROM `group`', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a specific group by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM `group` WHERE group_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(results[0]);
    });
});

// Create a new group
router.post('/', (req, res) => {
    const { group_name, mentor1_id, mentor2_id } = req.body;
    const sql = 'INSERT INTO `group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)';
    db.query(sql, [group_name, mentor1_id, mentor2_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            group_id: result.insertId,
            group_name,
            mentor1_id,
            mentor2_id,
            created_at: new Date(),
            updated_at: new Date()
        });
    });
});

// Update a group
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { group_name, mentor1_id, mentor2_id } = req.body;
    const sql = 'UPDATE `group` SET group_name = ?, mentor1_id = ?, mentor2_id = ?, updated_at = CURRENT_TIMESTAMP WHERE group_id = ?';
    db.query(sql, [group_name, mentor1_id, mentor2_id, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json({ message: 'Group updated successfully' });
    });
});

// Delete a group
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM `group` WHERE group_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json({ message: 'Group deleted successfully' });
    });
});

module.exports = router;