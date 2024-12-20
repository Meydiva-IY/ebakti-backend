"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all tasks


router.get('/', function (req, res) {
  db.query('SELECT * FROM task', function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.json(results);
  });
}); // Get a specific task by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM task WHERE task_id = ?', [id], function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (results.length === 0) return res.status(404).json({
      message: 'Task not found'
    });
    res.json(results[0]);
  });
}); // Create a new task

router.post('/', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      due_date = _req$body.due_date,
      task_image = _req$body.task_image;
  var sql = 'INSERT INTO task (title, description, due_date, task_image) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, task_image], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.status(201).json({
      task_id: result.insertId,
      title: title,
      description: description,
      due_date: due_date,
      task_image: task_image
    });
  });
}); // Update a task

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      description = _req$body2.description,
      due_date = _req$body2.due_date,
      task_image = _req$body2.task_image;
  var sql = 'UPDATE task SET title = ?, description = ?, due_date = ?, task_image = ? WHERE task_id = ?';
  db.query(sql, [title, description, due_date, task_image, id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Task not found'
    });
    res.json({
      message: 'Task updated successfully'
    });
  });
}); // Delete a task

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM task WHERE task_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Task not found'
    });
    res.json({
      message: 'Task deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=task.dev.js.map
