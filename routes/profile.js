const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all profiles
router.get('/', (req, res) => {
    db.query('SELECT * FROM Profile', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new profile
router.post('/', (req, res) => {
    const { user_id, profile_picture, full_name, department, date_of_birth, gender, address } = req.body;
    const sql = 'INSERT INTO Profile (user_id, profile_picture, full_name, department, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, user_id, profile_picture, full_name, department, date_of_birth, gender, address });
    });
});

// Update a profile
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, profile_picture, full_name, department, date_of_birth, gender, address } = req.body;
    const sql = 'UPDATE Profile SET user_id = ?, profile_picture = ?, full_name = ?, department = ?, date_of_birth = ?, gender = ?, address = ? WHERE profile_id = ?';
    db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Profile updated successfully' });
    });
});

// Delete a profile
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Profile WHERE profile_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Profile deleted successfully' });
    });
});

module.exports = router;