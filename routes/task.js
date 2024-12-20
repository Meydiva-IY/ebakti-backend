const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM task', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific task by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM task WHERE task_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Task not found' });
        res.json(results[0]);
    });
});

// Create a new task
router.post('/', (req, res) => {
    const { title, description, due_date, task_image } = req.body;
    const sql = 'INSERT INTO task (title, description, due_date, task_image) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, due_date, task_image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ task_id: result.insertId, title, description, due_date, task_image });
    });
});

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, task_image } = req.body;
    const sql = 'UPDATE task SET title = ?, description = ?, due_date = ?, task_image = ? WHERE task_id = ?';
    db.query(sql, [title, description, due_date, task_image, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task updated successfully' });
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM task WHERE task_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;