const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all group members
router.get('/', (req, res) => {
    db.query('SELECT * FROM group_member', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a specific group member by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM group_member WHERE group_member_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Group member not found' });
        }
        res.json(results[0]);
    });
});

// Create a new group member
router.post('/', (req, res) => {
    const { group_id, period_id, profile_id } = req.body;
    const sql = 'INSERT INTO group_member (group_id, period_id, profile_id) VALUES (?, ?, ?)';
    db.query(sql, [group_id, period_id, profile_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            group_member_id: result.insertId,
            group_id,
            period_id,
            profile_id,
            created_at: new Date()
        });
    });
});

// Update a group member
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { group_id, period_id, profile_id } = req.body;
    const sql = 'UPDATE group_member SET group_id = ?, period_id = ?, profile_id = ? WHERE group_member_id = ?';
    db.query(sql, [group_id, period_id, profile_id, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group member not found' });
        }
        res.json({ message: 'Group member updated successfully' });
    });
});

// Delete a group member
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM group_member WHERE group_member_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group member not found' });
        }
        res.json({ message: 'Group member deleted successfully' });
    });
});

module.exports = router;