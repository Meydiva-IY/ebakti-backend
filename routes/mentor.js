const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all mentors
router.get('/', (req, res) => {
    db.query('SELECT * FROM mentor', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific mentor by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM mentor WHERE mentor_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Mentor not found' });
        res.json(results[0]);
    });
});

// Create a new mentor
router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO mentor (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mentor_id: result.insertId, name, created_at: new Date(), updated_at: new Date() });
    });
});

// Update a mentor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE mentor SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE mentor_id = ?';
    db.query(sql, [name, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mentor not found' });
        res.json({ message: 'Mentor updated successfully' });
    });
});

// Delete a mentor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mentor WHERE mentor_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mentor not found' });
        res.json({ message: 'Mentor deleted successfully' });
    });
});

module.exports = router;