const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all medical histories
router.get('/', (req, res) => {
    db.query('SELECT * FROM medical_history', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a specific medical history by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM medical_history WHERE medical_history_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Medical history not found' });
        }
        res.json(results[0]);
    });
});

// Create a new medical history record
router.post('/', (req, res) => {
    const { profile_id, disease_name, description } = req.body;
    const sql = 'INSERT INTO medical_history (profile_id, disease_name, description) VALUES (?, ?, ?)';
    db.query(sql, [profile_id, disease_name, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            medical_history_id: result.insertId,
            profile_id,
            disease_name,
            description,
            created_at: new Date(),
            updated_at: new Date()
        });
    });
});

// Update a medical history record
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { profile_id, disease_name, description } = req.body;
    const sql = 'UPDATE medical_history SET profile_id = ?, disease_name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE medical_history_id = ?';
    db.query(sql, [profile_id, disease_name, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medical history not found' });
        }
        res.json({ message: 'Medical history updated successfully' });
    });
});

// Delete a medical history record
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM medical_history WHERE medical_history_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medical history not found' });
        }
        res.json({ message: 'Medical history deleted successfully' });
    });
});

module.exports = router;