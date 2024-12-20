const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all challenges
router.get('/', (req, res) => {
    db.query('SELECT * FROM challenge', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a specific challenge by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM challenge WHERE challenge_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json(results[0]);
    });
});

// Create a new challenge
router.post('/', (req, res) => {
    const { title, description, due_date, challenge_image } = req.body;
    const sql = 'INSERT INTO challenge (title, description, due_date, challenge_image) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, due_date, challenge_image], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            challenge_id: result.insertId,
            title,
            description,
            due_date,
            challenge_image,
            created_at: new Date(),
            updated_at: new Date()
        });
    });
});

// Update a challenge
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, challenge_image } = req.body;
    const sql = 'UPDATE challenge SET title = ?, description = ?, due_date = ?, challenge_image = ?, updated_at = CURRENT_TIMESTAMP WHERE challenge_id = ?';
    db.query(sql, [title, description, due_date, challenge_image, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json({ message: 'Challenge updated successfully' });
    });
});

// Delete a challenge
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM challenge WHERE challenge_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json({ message: 'Challenge deleted successfully' });
    });
});

module.exports = router;