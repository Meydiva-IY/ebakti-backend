"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all challenge submissions


router.get('/', function (req, res) {
  db.query('SELECT * FROM challenge_submission', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific challenge submission by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM challenge_submission WHERE submission_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Challenge submission not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new challenge submission

router.post('/', function (req, res) {
  var _req$body = req.body,
      challenge_id = _req$body.challenge_id,
      profile_id = _req$body.profile_id,
      submission_date = _req$body.submission_date,
      score = _req$body.score,
      submission_file = _req$body.submission_file,
      feedback = _req$body.feedback,
      status = _req$body.status;
  var sql = 'INSERT INTO challenge_submission (challenge_id, profile_id, submission_date, score, submission_file, feedback, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [challenge_id, profile_id, submission_date, score, submission_file, feedback, status], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      submission_id: result.insertId,
      challenge_id: challenge_id,
      profile_id: profile_id,
      submission_date: submission_date,
      score: score,
      submission_file: submission_file,
      feedback: feedback,
      status: status,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update a challenge submission

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      challenge_id = _req$body2.challenge_id,
      profile_id = _req$body2.profile_id,
      submission_date = _req$body2.submission_date,
      score = _req$body2.score,
      submission_file = _req$body2.submission_file,
      feedback = _req$body2.feedback,
      status = _req$body2.status;
  var sql = 'UPDATE challenge_submission SET challenge_id = ?, profile_id = ?, submission_date = ?, score = ?, submission_file = ?, feedback = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE submission_id = ?';
  db.query(sql, [challenge_id, profile_id, submission_date, score, submission_file, feedback, status, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Challenge submission not found'
      });
    }

    res.json({
      message: 'Challenge submission updated successfully'
    });
  });
}); // Delete a challenge submission

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM challenge_submission WHERE submission_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Challenge submission not found'
      });
    }

    res.json({
      message: 'Challenge submission deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=challengeSubmission.dev.js.map
