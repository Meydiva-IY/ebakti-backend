"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all challenges


router.get('/', function (req, res) {
  db.query('SELECT * FROM challenge', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific challenge by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM challenge WHERE challenge_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Challenge not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new challenge

router.post('/', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      due_date = _req$body.due_date,
      challenge_image = _req$body.challenge_image;
  var sql = 'INSERT INTO challenge (title, description, due_date, challenge_image) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, challenge_image], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      challenge_id: result.insertId,
      title: title,
      description: description,
      due_date: due_date,
      challenge_image: challenge_image,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update a challenge

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      description = _req$body2.description,
      due_date = _req$body2.due_date,
      challenge_image = _req$body2.challenge_image;
  var sql = 'UPDATE challenge SET title = ?, description = ?, due_date = ?, challenge_image = ?, updated_at = CURRENT_TIMESTAMP WHERE challenge_id = ?';
  db.query(sql, [title, description, due_date, challenge_image, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Challenge not found'
      });
    }

    res.json({
      message: 'Challenge updated successfully'
    });
  });
}); // Delete a challenge

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM challenge WHERE challenge_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Challenge not found'
      });
    }

    res.json({
      message: 'Challenge deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=challenge.dev.js.map
