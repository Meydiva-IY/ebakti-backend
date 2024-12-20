"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all attendance records


router.get('/', function (req, res) {
  db.query('SELECT * FROM Attendance', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new attendance record

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_id = _req$body.group_id,
      period_id = _req$body.period_id,
      user_id = _req$body.user_id,
      gambar_selfie = _req$body.gambar_selfie,
      date = _req$body.date,
      location = _req$body.location,
      status = _req$body.status;
  var sql = 'INSERT INTO Attendance (group_id, period_id, user_id, gambar_selfie, date, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [group_id, period_id, user_id, gambar_selfie, date, location, status], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      group_id: group_id,
      period_id: period_id,
      user_id: user_id,
      gambar_selfie: gambar_selfie,
      date: date,
      location: location,
      status: status
    });
  });
}); // Update an attendance record

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_id = _req$body2.group_id,
      period_id = _req$body2.period_id,
      user_id = _req$body2.user_id,
      gambar_selfie = _req$body2.gambar_selfie,
      date = _req$body2.date,
      location = _req$body2.location,
      status = _req$body2.status;
  var sql = 'UPDATE Attendance SET group_id = ?, period_id = ?, user_id = ?, gambar_selfie = ?, date = ?, location = ?, status = ? WHERE attendance_id = ?';
  db.query(sql, [group_id, period_id, user_id, gambar_selfie, date, location, status, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Attendance updated successfully'
    });
  });
}); // Delete an attendance record

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Attendance WHERE attendance_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Attendance deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=attendance.dev.js.map
