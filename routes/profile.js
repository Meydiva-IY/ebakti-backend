const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all profiles
router.get('/', (req, res) => {
    db.query('SELECT * FROM profile', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific profile by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM profile WHERE profile_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Profile not found' });
        res.json(results[0]);
    });
});

// Create a new profile
router.post('/', (req, res) => {
    const { user_id, profile_picture, full_name, department, date_of_birth, gender, address } = req.body;
    const sql = 'INSERT INTO profile (user_id, profile_picture, full_name, department, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ profile_id: result.insertId, user_id, profile_picture, full_name, department, date_of_birth, gender, address });
    });
});

// Update a profile
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { profile_picture, full_name, department, date_of_birth, gender, address } = req.body;
    const sql = 'UPDATE profile SET profile_picture = ?, full_name = ?, department = ?, date_of_birth = ?, gender = ?, address = ? WHERE profile_id = ?';
    db.query(sql, [profile_picture, full_name, department, date_of_birth, gender, address, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Profile not found' });
        res.json({ message: 'Profile updated successfully' });
    });
});

// Delete a profile
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM profile WHERE profile_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Profile not found' });
        res.json({ message: 'Profile deleted successfully' });
    });
});

module.exports = router;