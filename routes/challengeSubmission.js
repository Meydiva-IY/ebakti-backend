const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all challenge submissions
router.get('/', (req, res) => {
    db.query('SELECT * FROM challenge_submission', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a specific challenge submission by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM challenge_submission WHERE submission_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Challenge submission not found' });
        }
        res.json(results[0]);
    });
});

// Create a new challenge submission
router.post('/', (req, res) => {
    const { challenge_id, profile_id, submission_date, score, submission_file, feedback, status } = req.body;
    const sql = 'INSERT INTO challenge_submission (challenge_id, profile_id, submission_date, score, submission_file, feedback, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [challenge_id, profile_id, submission_date, score, submission_file, feedback, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            submission_id: result.insertId,
            challenge_id,
            profile_id,
            submission_date,
            score,
            submission_file,
            feedback,
            status,
            created_at: new Date(),
            updated_at: new Date()
        });
    });
});

// Update a challenge submission
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { challenge_id, profile_id, submission_date, score, submission_file, feedback, status } = req.body;
    const sql = 'UPDATE challenge_submission SET challenge_id = ?, profile_id = ?, submission_date = ?, score = ?, submission_file = ?, feedback = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE submission_id = ?';
    db.query(sql, [challenge_id, profile_id, submission_date, score, submission_file, feedback, status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Challenge submission not found' });
        }
        res.json({ message: 'Challenge submission updated successfully' });
    });
});

// Delete a challenge submission
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM challenge_submission WHERE submission_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Challenge submission not found' });
        }
        res.json({ message: 'Challenge submission deleted successfully' });
    });
});

module.exports = router;