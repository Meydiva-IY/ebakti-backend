"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all task submissions


router.get('/', function (req, res) {
  db.query('SELECT * FROM task_submission', function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.json(results);
  });
}); // Get a specific task submission by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM task_submission WHERE submission_id = ?', [id], function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (results.length === 0) return res.status(404).json({
      message: 'Submission not found'
    });
    res.json(results[0]);
  });
}); // Create a new task submission

router.post('/', function (req, res) {
  var _req$body = req.body,
      task_id = _req$body.task_id,
      profile_id = _req$body.profile_id,
      submission_file = _req$body.submission_file,
      submission_link = _req$body.submission_link,
      feedback = _req$body.feedback,
      status = _req$body.status;
  var sql = 'INSERT INTO task_submission (task_id, profile_id, submission_file, submission_link, feedback, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [task_id, profile_id, submission_file, submission_link, feedback, status], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.status(201).json({
      submission_id: result.insertId,
      task_id: task_id,
      profile_id: profile_id,
      submission_file: submission_file,
      submission_link: submission_link,
      feedback: feedback,
      status: status
    });
  });
}); // Update a task submission

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      score = _req$body2.score,
      submission_file = _req$body2.submission_file,
      submission_link = _req$body2.submission_link,
      feedback = _req$body2.feedback,
      status = _req$body2.status;
  var sql = 'UPDATE task_submission SET score = ?, submission_file = ?, submission_link = ?, feedback = ?, status = ? WHERE submission_id = ?';
  db.query(sql, [score, submission_file, submission_link, feedback, status, id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Submission not found'
    });
    res.json({
      message: 'Submission updated successfully'
    });
  });
}); // Delete a task submission

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM task_submission WHERE submission_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Submission not found'
    });
    res.json({
      message: 'Submission deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=taskSubmission.dev.js.map
