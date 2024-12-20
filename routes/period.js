const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all periods
router.get('/', (req, res) => {
    db.query('SELECT * FROM Period', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Create a new period
router.post('/', (req, res) => {
    const { period_name, start_date, end_date } = req.body;
    const sql = 'INSERT INTO Period (period_name, start_date, end_date) VALUES (?, ?, ?)';
    db.query(sql, [period_name, start_date, end_date], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error creating period' });
        }
        res.status(201).json({ id: result.insertId, period_name, start_date, end_date });
    });
});

// Update a period
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { period_name, start_date, end_date } = req.body;
    const sql = 'UPDATE Period SET period_name = ?, start_date = ?, end_date = ? WHERE period_id = ?';
    db.query(sql, [period_name, start_date, end_date, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error updating period' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.json({ message: 'Period updated successfully' });
    });
});

// Delete a period
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Period WHERE period_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error deleting period' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Period not found' });
        }
        res.json({ message: 'Period deleted successfully' });
    });
});

module.exports = router;