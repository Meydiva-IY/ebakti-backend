"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all periods


router.get('/', function (req, res) {
  db.query('SELECT * FROM period', function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.json(results);
  });
}); // Get a specific period by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM period WHERE period_id = ?', [id], function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (results.length === 0) return res.status(404).json({
      message: 'Period not found'
    });
    res.json(results[0]);
  });
}); // Create a new period

router.post('/', function (req, res) {
  var _req$body = req.body,
      period_name = _req$body.period_name,
      start_date = _req$body.start_date,
      end_date = _req$body.end_date;
  var sql = 'INSERT INTO period (period_name, start_date, end_date) VALUES (?, ?, ?)';
  db.query(sql, [period_name, start_date, end_date], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.status(201).json({
      period_id: result.insertId,
      period_name: period_name,
      start_date: start_date,
      end_date: end_date
    });
  });
}); // Update a period

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      period_name = _req$body2.period_name,
      start_date = _req$body2.start_date,
      end_date = _req$body2.end_date;
  var sql = 'UPDATE period SET period_name = ?, start_date = ?, end_date = ? WHERE period_id = ?';
  db.query(sql, [period_name, start_date, end_date, id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Period not found'
    });
    res.json({
      message: 'Period updated successfully'
    });
  });
}); // Delete a period

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM period WHERE period_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Period not found'
    });
    res.json({
      message: 'Period deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=period.dev.js.map
