// periodController.js
const db = require('../config/db');

const periodController = {
    create: async (req, res) => {
        try {
            const { period_name, start_date, end_date } = req.body;
            const [result] = await db.query(
                'INSERT INTO period (period_name, start_date, end_date) VALUES (?, ?, ?)',
                [period_name, start_date, end_date]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const [periods] = await db.query('SELECT * FROM period');
            res.json(periods);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { periodController }; // Pastikan ini ada