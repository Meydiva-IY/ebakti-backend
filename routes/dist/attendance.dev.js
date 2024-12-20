"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all attendance records


router.get('/', function (req, res) {
  db.query('SELECT * FROM attendance', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific attendance record by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Attendance record not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new attendance record

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_id = _req$body.group_id,
      period_id = _req$body.period_id,
      profile_id = _req$body.profile_id,
      selfie_image = _req$body.selfie_image,
      date = _req$body.date,
      location = _req$body.location,
      status = _req$body.status;
  var sql = 'INSERT INTO attendance (group_id, period_id, profile_id, selfie_image, date, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [group_id, period_id, profile_id, selfie_image, date, location, status], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      attendance_id: result.insertId,
      group_id: group_id,
      period_id: period_id,
      profile_id: profile_id,
      selfie_image: selfie_image,
      date: date,
      location: location,
      status: status,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update an attendance record

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_id = _req$body2.group_id,
      period_id = _req$body2.period_id,
      profile_id = _req$body2.profile_id,
      selfie_image = _req$body2.selfie_image,
      date = _req$body2.date,
      location = _req$body2.location,
      status = _req$body2.status;
  var sql = 'UPDATE attendance SET group_id = ?, period_id = ?, profile_id = ?, selfie_image = ?, date = ?, location = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE attendance_id = ?';
  db.query(sql, [group_id, period_id, profile_id, selfie_image, date, location, status, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Attendance record not found'
      });
    }

    res.json({
      message: 'Attendance record updated successfully'
    });
  });
}); // Delete an attendance record

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM attendance WHERE attendance_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Attendance record not found'
      });
    }

    res.json({
      message: 'Attendance record deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=attendance.dev.js.map
