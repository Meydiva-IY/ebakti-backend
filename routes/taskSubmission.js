const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all task submissions
router.get('/', (req, res) => {
    db.query('SELECT * FROM task_submission', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific task submission by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM task_submission WHERE submission_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Submission not found' });
        res.json(results[0]);
    });
});

// Create a new task submission
router.post('/', (req, res) => {
    const { task_id, profile_id, submission_file, submission_link, feedback, status } = req.body;
    const sql = 'INSERT INTO task_submission (task_id, profile_id, submission_file, submission_link, feedback, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [task_id, profile_id, submission_file, submission_link, feedback, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ submission_id: result.insertId, task_id, profile_id, submission_file, submission_link, feedback, status });
    });
});

// Update a task submission
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { score, submission_file, submission_link, feedback, status } = req.body;
    const sql = 'UPDATE task_submission SET score = ?, submission_file = ?, submission_link = ?, feedback = ?, status = ? WHERE submission_id = ?';
    db.query(sql, [score, submission_file, submission_link, feedback, status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Submission not found' });
        res.json({ message: 'Submission updated successfully' });
    });
});

// Delete a task submission
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM task_submission WHERE submission_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Submission not found' });
        res.json({ message: 'Submission deleted successfully' });
    });
});

module.exports = router;