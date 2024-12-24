// taskController.js
const db = require('../config/db');

const taskController = {
    create: async (req, res) => {
        try {
            const { title, description, due_date } = req.body;
            const task_image = req.file?.filename; // Get the uploaded file name if it exists
            const [result] = await db.query(
                'INSERT INTO task (title, description, due_date, task_image) VALUES (?, ?, ?, ?)',
                [title, description, due_date, task_image]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const [tasks] = await db.query('SELECT * FROM task ORDER BY due_date');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const [task] = await db.query('SELECT * FROM task WHERE task_id = ?', [req.params.id]);
            if (!task[0]) return res.status(404).json({ message: 'Task not found' });
            res.json(task[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { title, description, due_date } = req.body;
            const task_image = req.file?.filename; // Get the uploaded file name if it exists
            await db.query(
                'UPDATE task SET title = ?, description = ?, due_date = ?, task_image = COALESCE(?, task_image) WHERE task_id = ?',
                [title, description, due_date, task_image, req.params.id]
            );
            res.json({ message: 'Task updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await db.query('DELETE FROM task WHERE task_id = ?', [req.params.id]);
            res.json({ message: 'Task deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    taskController
};