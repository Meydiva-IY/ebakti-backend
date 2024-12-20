"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all profiles


router.get('/', function (req, res) {
  db.query('SELECT * FROM Profile', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new profile

router.post('/', function (req, res) {
  var _req$body = req.body,
      user_id = _req$body.user_id,
      profile_picture = _req$body.profile_picture,
      full_name = _req$body.full_name,
      department = _req$body.department,
      date_of_birth = _req$body.date_of_birth,
      gender = _req$body.gender,
      address = _req$body.address;
  var sql = 'INSERT INTO Profile (user_id, profile_picture, full_name, department, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      user_id: user_id,
      profile_picture: profile_picture,
      full_name: full_name,
      department: department,
      date_of_birth: date_of_birth,
      gender: gender,
      address: address
    });
  });
}); // Update a profile

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      user_id = _req$body2.user_id,
      profile_picture = _req$body2.profile_picture,
      full_name = _req$body2.full_name,
      department = _req$body2.department,
      date_of_birth = _req$body2.date_of_birth,
      gender = _req$body2.gender,
      address = _req$body2.address;
  var sql = 'UPDATE Profile SET user_id = ?, profile_picture = ?, full_name = ?, department = ?, date_of_birth = ?, gender = ?, address = ? WHERE profile_id = ?';
  db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Profile updated successfully'
    });
  });
}); // Delete a profile

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM Profile WHERE profile_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Profile deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=profile.dev.js.map
