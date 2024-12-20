const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all task submissions
router.get('/', (req, res) => {
    db.query('SELECT * FROM TaskSubmission', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new task submission
router.post('/', (req, res) => {
    const { task_id, user_id, score, taskfile_path, link, feedback, status } = req.body;
    const sql = 'INSERT INTO TaskSubmission (task_id, user_id, score, taskfile_path, link, feedback, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [task_id, user_id, score, taskfile_path, link, feedback, status], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, task_id, user_id, score, taskfile_path, link, feedback, status });
    });
});

// Update a task submission
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task_id, user_id, score, taskfile_path, link, feedback, status } = req.body;
    const sql = 'UPDATE TaskSubmission SET task_id = ?, user_id = ?, score = ?, taskfile_path = ?, link = ?, feedback = ?, status = ? WHERE submission_id = ?';
    db.query(sql, [task_id, user_id, score, taskfile_path, link, feedback, status, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task submission updated successfully' });
    });
});

// Delete a task submission
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM TaskSubmission WHERE submission_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task submission deleted successfully' });
    });
});

module.exports = router;