const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser  = (req, res) => {
    const { role, email, password } = req.body;
    const sql = 'INSERT INTO User (role, email, password) VALUES (?, ?, ?)';
    db.query(sql, [role, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, role, email });
    });
};

// User login
const loginUser  = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM User WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = results[0];
        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

// Get all users
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Update a user
const updateUser  = (req, res) => {
    const { id } = req.params;
    const { role, email, password } = req.body;
    const sql = 'UPDATE User SET role = ?, email = ?, password = ? WHERE user_id = ?';
    db.query(sql, [role, email, password, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status( 404).json({ message: 'User  not found' });
        }
        res.json({ message: 'User  updated successfully' });
    });
};

// Delete a user
const deleteUser   = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM User WHERE user_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json({ message: 'User  deleted successfully' });
    });
};

module.exports = {
    createUser ,
    loginUser ,
    getAllUsers,
    updateUser ,
    deleteUser ,
};