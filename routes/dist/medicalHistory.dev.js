"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all medical histories


router.get('/', function (req, res) {
  db.query('SELECT * FROM medical_history', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific medical history by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM medical_history WHERE medical_history_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Medical history not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new medical history record

router.post('/', function (req, res) {
  var _req$body = req.body,
      profile_id = _req$body.profile_id,
      disease_name = _req$body.disease_name,
      description = _req$body.description;
  var sql = 'INSERT INTO medical_history (profile_id, disease_name, description) VALUES (?, ?, ?)';
  db.query(sql, [profile_id, disease_name, description], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      medical_history_id: result.insertId,
      profile_id: profile_id,
      disease_name: disease_name,
      description: description,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update a medical history record

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      profile_id = _req$body2.profile_id,
      disease_name = _req$body2.disease_name,
      description = _req$body2.description;
  var sql = 'UPDATE medical_history SET profile_id = ?, disease_name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE medical_history_id = ?';
  db.query(sql, [profile_id, disease_name, description, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Medical history not found'
      });
    }

    res.json({
      message: 'Medical history updated successfully'
    });
  });
}); // Delete a medical history record

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM medical_history WHERE medical_history_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Medical history not found'
      });
    }

    res.json({
      message: 'Medical history deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=medicalHistory.dev.js.map
