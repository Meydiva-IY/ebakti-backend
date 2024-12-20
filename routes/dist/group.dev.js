"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all groups


router.get('/', function (req, res) {
  db.query('SELECT * FROM `Group`', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new group

router.post('/', function (req, res) {
  var _req$body = req.body,
      group_name = _req$body.group_name,
      mentor1_id = _req$body.mentor1_id,
      mentor2_id = _req$body.mentor2_id;
  var sql = 'INSERT INTO `Group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)';
  db.query(sql, [group_name, mentor1_id, mentor2_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      group_name: group_name,
      mentor1_id: mentor1_id,
      mentor2_id: mentor2_id
    });
  });
}); // Update a group

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      group_name = _req$body2.group_name,
      mentor1_id = _req$body2.mentor1_id,
      mentor2_id = _req$body2.mentor2_id;
  var sql = 'UPDATE `Group` SET group_name = ?, mentor1_id = ?, mentor2_id = ? WHERE group_id = ?';
  db.query(sql, [group_name, mentor1_id, mentor2_id, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Group updated successfully'
    });
  });
}); // Delete a group

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM `Group` WHERE group_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Group deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=group.dev.js.map
