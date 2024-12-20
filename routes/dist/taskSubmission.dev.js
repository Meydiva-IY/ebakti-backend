"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all task submissions


router.get('/', function (req, res) {
  db.query('SELECT * FROM TaskSubmission', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new task submission

router.post('/', function (req, res) {
  var _req$body = req.body,
      task_id = _req$body.task_id,
      user_id = _req$body.user_id,
      score = _req$body.score,
      taskfile_path = _req$body.taskfile_path,
      link = _req$body.link,
      feedback = _req$body.feedback,
      status = _req$body.status;
  var sql = 'INSERT INTO TaskSubmission (task_id, user_id, score, taskfile_path, link, feedback, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [task_id, user_id, score, taskfile_path, link, feedback, status], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      task_id: task_id,
      user_id: user_id,
      score: score,
      taskfile_path: taskfile_path,
      link: link,
      feedback: feedback,
      status: status
    });
  });
}); // Update a task submission

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      task_id = _req$body2.task_id,
      user_id = _req$body2.user_id,
      score = _req$body2.score,
      taskfile_path = _req$body2.taskfile_path,
      link = _req$body2.link,
      feedback = _req$body2.feedback,
      status = _req$body2.status;
  var sql = 'UPDATE TaskSubmission SET task_id = ?, user_id = ?, score = ?, taskfile_path = ?, link = ?, feedback = ?, status = ? WHERE submission_id = ?';
  db.query(sql, [task_id, user_id, score, taskfile_path, link, feedback, status, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Task submission updated successfully'
    });
  });
}); // Delete a task submission

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM TaskSubmission WHERE submission_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Task submission deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=taskSubmission.dev.js.map
