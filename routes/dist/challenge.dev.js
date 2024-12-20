"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all challenges


router.get('/', function (req, res) {
  db.query('SELECT * FROM Challenge', function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    res.json(results);
  });
}); // Create a new challenge

router.post('/', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      due_date = _req$body.due_date,
      clg_pic = _req$body.clg_pic;
  var sql = 'INSERT INTO Challenge (title, description, due_date, clg_pic) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, clg_pic], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error creating challenge'
      });
    }

    res.status(201).json({
      id: result.insertId,
      title: title,
      description: description,
      due_date: due_date,
      clg_pic: clg_pic
    });
  });
}); // Update a challenge

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      description = _req$body2.description,
      due_date = _req$body2.due_date,
      clg_pic = _req$body2.clg_pic;
  var sql = 'UPDATE Challenge SET title = ?, description = ?, due_date = ?, clg_pic = ? WHERE challenge_id = ?';
  db.query(sql, [title, description, due_date, clg_pic, id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error updating challenge'
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
  var sql = 'DELETE FROM Challenge WHERE challenge_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error deleting challenge'
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
