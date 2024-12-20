const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all challenge submissions
router.get('/', (req, res) => {
    db.query('SELECT * FROM ChallengeSubmission', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new challenge submission
router.post('/', (req, res) => {
    const { challenge_id, user_id, score, clgfile_path, feedback, status } = req.body;
    const sql = 'INSERT INTO ChallengeSubmission (challenge_id, user_id, score, clgfile_path, feedback, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [challenge_id, user_id, score, clgfile_path, feedback, status], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, challenge_id, user_id, score, clgfile_path, feedback, status });
    });
});

// Update a challenge submission
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { challenge_id, user_id, score, clgfile_path, feedback, status } = req.body;
    const sql = 'UPDATE ChallengeSubmission SET challenge_id = ?, user_id = ?, score = ?, clgfile_path = ?, feedback = ?, status = ? WHERE submission_id = ?';
    db.query(sql, [challenge_id, user_id, score, clgfile_path, feedback, status, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Challenge submission updated successfully' });
    });
});

// Delete a challenge submission
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ChallengeSubmission WHERE submission_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Challenge submission deleted successfully' });
    });
});

module.exports = router;