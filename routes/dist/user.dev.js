"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all users


router.get('/', function (req, res) {
  db.query('SELECT * FROM User', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new user

router.post('/', function (req, res) {
  var _req$body = req.body,
      role = _req$body.role,
      username = _req$body.username,
      password = _req$body.password,
      nohp = _req$body.nohp;
  var sql = 'INSERT INTO User (role, username, password, nohp) VALUES (?, ?, ?, ?)';
  db.query(sql, [role, username, password, nohp], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      role: role,
      username: username,
      nohp: nohp
    });
  });
}); // Update a user

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      role = _req$body2.role,
      username = _req$body2.username,
      password = _req$body2.password,
      nohp = _req$body2.nohp;
  var sql = 'UPDATE User SET role = ?, username = ?, password = ?, nohp = ? WHERE user_id = ?';
  db.query(sql, [role, username, password, nohp, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'User  updated successfully'
    });
  });
}); // Delete a user

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM User WHERE user_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'User  deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=user.dev.js.map
