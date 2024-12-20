"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all challenge submissions


router.get('/', function (req, res) {
  db.query('SELECT * FROM ChallengeSubmission', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new challenge submission

router.post('/', function (req, res) {
  var _req$body = req.body,
      challenge_id = _req$body.challenge_id,
      user_id = _req$body.user_id,
      score = _req$body.score,
      clgfile_path = _req$body.clgfile_path,
      feedback = _req$body.feedback,
      status = _req$body.status;
  var sql = 'INSERT INTO ChallengeSubmission (challenge_id, user_id, score, clgfile_path, feedback, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [challenge_id, user_id, score, clgfile_path, feedback, status], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      challenge_id: challenge_id,
      user_id: user_id,
      score: score,
      clgfile_path: clgfile_path,
      feedback: feedback,
      status: status
    });
  });
}); // Update a challenge submission

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      challenge_id = _req$body2.challenge_id,
      user_id = _req$body2.user_id,
      score = _req$body2.score,
      clgfile_path = _req$body2.clgfile_path,
      feedback = _req$body2.feedback,
      status = _req$body2.status;
  var sql = 'UPDATE ChallengeSubmission SET challenge_id = ?, user_id = ?, score = ?, clgfile_path = ?, feedback = ?, status = ? WHERE submission_id = ?';
  db.query(sql, [challenge_id, user_id, score, clgfile_path, feedback, status, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Challenge submission updated successfully'
    });
  });
}); // Delete a challenge submission

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM ChallengeSubmission WHERE submission_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Challenge submission deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=challengeSubmission.dev.js.map
