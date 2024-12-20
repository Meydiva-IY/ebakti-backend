const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all periods
router.get('/', (req, res) => {
    db.query('SELECT * FROM period', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific period by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM period WHERE period_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Period not found' });
        res.json(results[0]);
    });
});

// Create a new period
router.post('/', (req, res) => {
    const { period_name, start_date, end_date } = req.body;
    const sql = 'INSERT INTO period (period_name, start_date, end_date) VALUES (?, ?, ?)';
    db.query(sql, [period_name, start_date, end_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ period_id: result.insertId, period_name, start_date, end_date });
    });
});

// Update a period
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { period_name, start_date, end_date } = req.body;
    const sql = 'UPDATE period SET period_name = ?, start_date = ?, end_date = ? WHERE period_id = ?';
    db.query(sql, [period_name, start_date, end_date, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Period not found' });
        res.json({ message: 'Period updated successfully' });
    });
});

// Delete a period
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM period WHERE period_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Period not found' });
        res.json({ message: 'Period deleted successfully' });
    });
});

module.exports = router;