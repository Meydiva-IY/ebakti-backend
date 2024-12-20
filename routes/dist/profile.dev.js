"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all profiles


router.get('/', function (req, res) {
  db.query('SELECT * FROM profile', function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.json(results);
  });
}); // Get a specific profile by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM profile WHERE profile_id = ?', [id], function (err, results) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (results.length === 0) return res.status(404).json({
      message: 'Profile not found'
    });
    res.json(results[0]);
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
  var sql = 'INSERT INTO profile (user_id, profile_picture, full_name, department, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, profile_picture, full_name, department, date_of_birth, gender, address], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    res.status(201).json({
      profile_id: result.insertId,
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
      profile_picture = _req$body2.profile_picture,
      full_name = _req$body2.full_name,
      department = _req$body2.department,
      date_of_birth = _req$body2.date_of_birth,
      gender = _req$body2.gender,
      address = _req$body2.address;
  var sql = 'UPDATE profile SET profile_picture = ?, full_name = ?, department = ?, date_of_birth = ?, gender = ?, address = ? WHERE profile_id = ?';
  db.query(sql, [profile_picture, full_name, department, date_of_birth, gender, address, id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Profile not found'
    });
    res.json({
      message: 'Profile updated successfully'
    });
  });
}); // Delete a profile

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM profile WHERE profile_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) return res.status(500).json({
      error: err.message
    });
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Profile not found'
    });
    res.json({
      message: 'Profile deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=profile.dev.js.map
