const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all attendance records
router.get('/', (req, res) => {
    db.query('SELECT * FROM Attendance', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new attendance record
router.post('/', (req, res) => {
    const { group_id, period_id, user_id, gambar_selfie, date, location, status } = req.body;
    const sql = 'INSERT INTO Attendance (group_id, period_id, user_id, gambar_selfie, date, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [group_id, period_id, user_id, gambar_selfie, date, location, status], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, group_id, period_id, user_id, gambar_selfie, date, location, status });
    });
});

// Update an attendance record
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { group_id, period_id, user_id, gambar_selfie, date, location, status } = req.body;
    const sql = 'UPDATE Attendance SET group_id = ?, period_id = ?, user_id = ?, gambar_selfie = ?, date = ?, location = ?, status = ? WHERE attendance_id = ?';
    db.query(sql, [group_id, period_id, user_id, gambar_selfie, date, location, status, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Attendance updated successfully' });
    });
});

// Delete an attendance record
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Attendance WHERE attendance_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Attendance deleted successfully' });
    });
});

module.exports = router;