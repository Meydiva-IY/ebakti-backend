"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all notifications


router.get('/', function (req, res) {
  db.query('SELECT * FROM Notification', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new notification

router.post('/', function (req, res) {
  var _req$body = req.body,
      user_id = _req$body.user_id,
      message = _req$body.message,
      is_read = _req$body.is_read;
  var sql = 'INSERT INTO Notification (user_id, message, is_read) VALUES (?, ?, ?)';
  db.query(sql, [user_id, message, is_read], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      user_id: user_id,
      message: message,
      is_read: is_read
    });
  });
}); // Update a notification

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      user_id = _req$body2.user_id,
      message = _req$body2.message,
      is_read = _req$body2.is_read;
  var sql = 'UPDATE Notification SET user_id = ?, message = ?, is_read = ? WHERE notification_id = ?';
  db.query(sql, [user_id, message, is_read, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Notification updated successfully'
    });
  });
}); // Delete a notification

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Notification WHERE notification_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Notification deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=notification.dev.js.map
