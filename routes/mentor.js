const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all mentors
router.get('/', (req, res) => {
    db.query('SELECT * FROM Mentor', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Create a new mentor
router.post('/', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO Mentor (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error creating mentor' });
        }
        res.status(201).json({ id: result.insertId, name });
    });
});

// Update a mentor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = 'UPDATE Mentor SET name = ? WHERE mentor_id = ?';
    db.query(sql, [name, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error updating mentor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json({ message: 'Mentor updated successfully' });
    });
});

// Delete a mentor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Mentor WHERE mentor_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error deleting mentor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json({ message: 'Mentor deleted successfully' });
    });
});

module.exports = router;