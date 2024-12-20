const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all group members
router.get('/', (req, res) => {
    db.query('SELECT * FROM GroupMember', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Create a new group member
router.post('/', (req, res) => {
    const { group_id, period_id, user_id } = req.body;
    const sql = 'INSERT INTO GroupMember (group_id, period_id, user_id) VALUES (?, ?, ?)';
    db.query(sql, [group_id, period_id, user_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error creating group member' });
        }
        res.status(201).json({ id: result.insertId, group_id, period_id, user_id });
    });
});

// Update a group member
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { group_id, period_id, user_id } = req.body;
    const sql = 'UPDATE GroupMember SET group_id = ?, period_id = ?, user_id = ? WHERE group_member_id = ?';
    db.query(sql, [group_id, period_id, user_id, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error updating group member' });
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
    const sql = 'DELETE FROM GroupMember WHERE group_member_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error deleting group member' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Group member not found' });
        }
        res.json({ message: 'Group member deleted successfully' });
    });
});

module.exports = router;