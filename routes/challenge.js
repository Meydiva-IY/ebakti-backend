const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all challenges
router.get('/', (req, res) => {
    db.query('SELECT * FROM Challenge', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Create a new challenge
router.post('/', (req, res) => {
    const { title, description, due_date, clg_pic } = req.body;
    const sql = 'INSERT INTO Challenge (title, description, due_date, clg_pic) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, due_date, clg_pic], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error creating challenge' });
        }
        res.status(201).json({ id: result.insertId, title, description, due_date, clg_pic });
    });
});

// Update a challenge
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, clg_pic } = req.body;
    const sql = 'UPDATE Challenge SET title = ?, description = ?, due_date = ?, clg_pic = ? WHERE challenge_id = ?';
    db.query(sql, [title, description, due_date, clg_pic, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error updating challenge' });
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
    const sql = 'DELETE FROM Challenge WHERE challenge_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'Error deleting challenge' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json({ message: 'Challenge deleted successfully' });
    });
});

module.exports = router;