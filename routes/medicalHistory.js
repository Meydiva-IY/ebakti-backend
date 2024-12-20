const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all medical histories
router.get('/', (req, res) => {
    db.query('SELECT * FROM MedicalHistory', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new medical history record
router.post('/', (req, res) => {
    const { user_id, disease_name, description } = req.body;
    const sql = 'INSERT INTO MedicalHistory (user_id, disease_name, description) VALUES (?, ?, ?)';
    db.query(sql, [user_id, disease_name, description], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, user_id, disease_name, description });
    });
});

// Update a medical history record
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, disease_name, description } = req.body;
    const sql = 'UPDATE MedicalHistory SET user_id = ?, disease_name = ?, description = ? WHERE medical_history_id = ?';
    db.query(sql, [user_id, disease_name, description, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Medical history updated successfully' });
    });
});

// Delete a medical history record
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM MedicalHistory WHERE medical_history_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Medical history deleted successfully' });
    });
});

module.exports = router;