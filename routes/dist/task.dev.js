"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all tasks


router.get('/', function (req, res) {
  db.query('SELECT * FROM Task', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new task

router.post('/', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      due_date = _req$body.due_date,
      task_pic = _req$body.task_pic;
  var sql = 'INSERT INTO Task (title, description, due_date, task_pic) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, task_pic], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      title: title,
      description: description,
      due_date: due_date,
      task_pic: task_pic
    });
  });
}); // Update a task

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      description = _req$body2.description,
      due_date = _req$body2.due_date,
      task_pic = _req$body2.task_pic;
  var sql = 'UPDATE Task SET title = ?, description = ?, due_date = ?, task_pic = ? WHERE task_id = ?';
  db.query(sql, [title, description, due_date, task_pic, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Task updated successfully'
    });
  });
}); // Delete a task

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Task WHERE task_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Task deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=task.dev.js.map
