const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all groups
router.get('/', (req, res) => {
    db.query('SELECT * FROM `Group`', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new group
router.post('/', (req, res) => {
    const { group_name, mentor1_id, mentor2_id } = req.body;
    const sql = 'INSERT INTO `Group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)';
    db.query(sql, [group_name, mentor1_id, mentor2_id], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, group_name, mentor1_id, mentor2_id });
    });
});

// Update a group
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { group_name, mentor1_id, mentor2_id } = req.body;
    const sql = 'UPDATE `Group` SET group_name = ?, mentor1_id = ?, mentor2_id = ? WHERE group_id = ?';
    db.query(sql, [group_name, mentor1_id, mentor2_id, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Group updated successfully' });
    });
});

// Delete a group
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM `Group` WHERE group_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Group deleted successfully' });
    });
});

module.exports = router;