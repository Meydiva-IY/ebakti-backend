"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all group members


router.get('/', function (req, res) {
  db.query('SELECT * FROM GroupMember', function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    res.json(results);
  });
}); // Create a new group member

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_id = _req$body.group_id,
      period_id = _req$body.period_id,
      user_id = _req$body.user_id;
  var sql = 'INSERT INTO GroupMember (group_id, period_id, user_id) VALUES (?, ?, ?)';
  db.query(sql, [group_id, period_id, user_id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error creating group member'
      });
    }

    res.status(201).json({
      id: result.insertId,
      group_id: group_id,
      period_id: period_id,
      user_id: user_id
    });
  });
}); // Update a group member

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_id = _req$body2.group_id,
      period_id = _req$body2.period_id,
      user_id = _req$body2.user_id;
  var sql = 'UPDATE GroupMember SET group_id = ?, period_id = ?, user_id = ? WHERE group_member_id = ?';
  db.query(sql, [group_id, period_id, user_id, id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error updating group member'
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
  var sql = 'DELETE FROM GroupMember WHERE group_member_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(400).json({
        message: 'Error deleting group member'
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
