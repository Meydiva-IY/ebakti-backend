"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Pastikan Anda mengatur koneksi database di sini
// Get all groups


router.get('/', function (req, res) {
  db.query('SELECT * FROM `group`', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}); // Get a specific group by ID

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.query('SELECT * FROM `group` WHERE group_id = ?', [id], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Group not found'
      });
    }

    res.json(results[0]);
  });
}); // Create a new group

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_name = _req$body.group_name,
      mentor1_id = _req$body.mentor1_id,
      mentor2_id = _req$body.mentor2_id;
  var sql = 'INSERT INTO `group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)';
  db.query(sql, [group_name, mentor1_id, mentor2_id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      group_id: result.insertId,
      group_name: group_name,
      mentor1_id: mentor1_id,
      mentor2_id: mentor2_id,
      created_at: new Date(),
      updated_at: new Date()
    });
  });
}); // Update a group

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_name = _req$body2.group_name,
      mentor1_id = _req$body2.mentor1_id,
      mentor2_id = _req$body2.mentor2_id;
  var sql = 'UPDATE `group` SET group_name = ?, mentor1_id = ?, mentor2_id = ?, updated_at = CURRENT_TIMESTAMP WHERE group_id = ?';
  db.query(sql, [group_name, mentor1_id, mentor2_id, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Group not found'
      });
    }

    res.json({
      message: 'Group updated successfully'
    });
  });
}); // Delete a group

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM `group` WHERE group_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Group not found'
      });
    }

    res.json({
      message: 'Group deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=group.dev.js.map
