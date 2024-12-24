// groupController.js
const db = require('../config/db');

const groupController = {
    create: async (req, res) => {
        try {
            const { group_name, mentor1_id, mentor2_id } = req.body;
            const [result] = await db.query(
                'INSERT INTO `group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)',
                [group_name, mentor1_id, mentor2_id]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const [groups] = await db.query('SELECT * FROM `group`');
            res.json(groups);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { groupController }; // Pastikan ini ada