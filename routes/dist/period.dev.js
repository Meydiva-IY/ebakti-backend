"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all periods


router.get('/', function (req, res) {
  db.query('SELECT * FROM Period', function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    res.json(results);
  });
}); // Create a new period

router.post('/', function (req, res) {
  var _req$body = req.body,
      period_name = _req$body.period_name,
      start_date = _req$body.start_date,
      end_date = _req$body.end_date;
  var sql = 'INSERT INTO Period (period_name, start_date, end_date) VALUES (?, ?, ?)';
  db.query(sql, [period_name, start_date, end_date], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error creating period'
      });
    }

    res.status(201).json({
      id: result.insertId,
      period_name: period_name,
      start_date: start_date,
      end_date: end_date
    });
  });
}); // Update a period

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      period_name = _req$body2.period_name,
      start_date = _req$body2.start_date,
      end_date = _req$body2.end_date;
  var sql = 'UPDATE Period SET period_name = ?, start_date = ?, end_date = ? WHERE period_id = ?';
  db.query(sql, [period_name, start_date, end_date, id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error updating period'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Period not found'
      });
    }

    res.json({
      message: 'Period updated successfully'
    });
  });
}); // Delete a period

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Period WHERE period_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error deleting period'
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Period not found'
      });
    }

    res.json({
      message: 'Period deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=period.dev.js.map
