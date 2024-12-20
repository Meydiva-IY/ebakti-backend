"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all group members


router.get('/', function (req, res) {
  db.query('SELECT * FROM group_member', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific group member by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM group_member WHERE group_member_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Group member not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new group member

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_id = _req$body.group_id,
      period_id = _req$body.period_id,
      profile_id = _req$body.profile_id;
  var sql = 'INSERT INTO group_member (group_id, period_id, profile_id) VALUES (?, ?, ?)';
  db.query(sql, [group_id, period_id, profile_id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      group_member_id: result.insertId,
      group_id: group_id,
      period_id: period_id,
      profile_id: profile_id,
      created_at: new Date()
    });
  });
}); // Update a group member

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_id = _req$body2.group_id,
      period_id = _req$body2.period_id,
      profile_id = _req$body2.profile_id;
  var sql = 'UPDATE group_member SET group_id = ?, period_id = ?, profile_id = ? WHERE group_member_id = ?';
  db.query(sql, [group_id, period_id, profile_id, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Group member not found'
      });
    }

    res.json({
      message: 'Group member updated successfully'
    });
  });
}); // Delete a group member

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM group_member WHERE group_member_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Group member not found'
      });
    }

    res.json({
      message: 'Group member deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=groupMember.dev.js.map
