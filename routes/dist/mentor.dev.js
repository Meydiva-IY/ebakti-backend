"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all mentors


router.get('/', function (req, res) {
  db.query('SELECT * FROM mentor', function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.json(results);
  });
}); // Get a specific mentor by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM mentor WHERE mentor_id = ?', [id], function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (results.length === 0) return res.status(404).json({
      message: 'Mentor not found'
    });
    res.json(results[0]);
  });
}); // Create a new mentor

router.post('/', function (req, res) {
  var name = req.body.name;
  var sql = 'INSERT INTO mentor (name) VALUES (?)';
  db.query(sql, [name], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.status(201).json({
      mentor_id: result.insertId,
      name: name,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update a mentor

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var sql = 'UPDATE mentor SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE mentor_id = ?';
  db.query(sql, [name, id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Mentor not found'
    });
    res.json({
      message: 'Mentor updated successfully'
    });
  });
}); // Delete a mentor

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM mentor WHERE mentor_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Mentor not found'
    });
    res.json({
      message: 'Mentor deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=mentor.dev.js.map
