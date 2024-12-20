"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all mentors


router.get('/', function (req, res) {
  db.query('SELECT * FROM Mentor', function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    res.json(results);
  });
}); // Create a new mentor

router.post('/', function (req, res) {
  var name = req.body.name;
  var sql = 'INSERT INTO Mentor (name) VALUES (?)';
  db.query(sql, [name], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error creating mentor'
      });
    }

    res.status(201).json({
      id: result.insertId,
      name: name
    });
  });
}); // Update a mentor

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var sql = 'UPDATE Mentor SET name = ? WHERE mentor_id = ?';
  db.query(sql, [name, id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error updating mentor'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Mentor not found'
      });
    }

    res.json({
      message: 'Mentor updated successfully'
    });
  });
}); // Delete a mentor

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Mentor WHERE mentor_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error deleting mentor'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Mentor not found'
      });
    }

    res.json({
      message: 'Mentor deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=mentor.dev.js.map
