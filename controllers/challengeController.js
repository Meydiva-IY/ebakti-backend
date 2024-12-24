// challengeController.js
const db = require('../config/db');

const challengeController = {
    create: async (req, res) => {
        try {
            const { title, description, due_date } = req.body;
            const challenge_image = req.file?.filename; // Get the uploaded file name if it exists
            const [result] = await db.query(
                'INSERT INTO challenge (title, description, due_date, challenge_image) VALUES (?, ?, ?, ?)',
                [title, description, due_date, challenge_image]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const [challenges] = await db.query('SELECT * FROM challenge ORDER BY due_date');
            res.json(challenges);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { title, description, due_date } = req.body;
            const challenge_image = req.file?.filename; // Get the uploaded file name if it exists
            await db.query(
                'UPDATE challenge SET title = ?, description = ?, due_date = ?, challenge_image = COALESCE(?, challenge_image) WHERE challenge_id = ?',
                [title, description, due_date, challenge_image, req.params.id]
            );
            res.json({ message: 'Challenge updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    challengeController
};