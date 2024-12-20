const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM Task', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new task
router.post('/', (req, res) => {
    const { title, description, due_date, task_pic } = req.body;
    const sql = 'INSERT INTO Task (title, description, due_date, task_pic) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, due_date, task_pic], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, title, description, due_date, task_pic });
    });
});

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, task_pic } = req.body;
    const sql = 'UPDATE Task SET title = ?, description = ?, due_date = ?, task_pic = ? WHERE task_id = ?';
    db.query(sql, [title, description, due_date, task_pic, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task updated successfully' });
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Task WHERE task_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;