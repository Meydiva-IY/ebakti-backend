"use strict";

var express = require('express');

var router = express.Router();

var db = require('../config/db'); // Get all medical histories


router.get('/', function (req, res) {
  db.query('SELECT * FROM MedicalHistory', function (err, results) {
    if (err) throw err;
    res.json(results);
  });
}); // Create a new medical history record

router.post('/', function (req, res) {
  var _req$body = req.body,
      user_id = _req$body.user_id,
      disease_name = _req$body.disease_name,
      description = _req$body.description;
  var sql = 'INSERT INTO MedicalHistory (user_id, disease_name, description) VALUES (?, ?, ?)';
  db.query(sql, [user_id, disease_name, description], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      id: result.insertId,
      user_id: user_id,
      disease_name: disease_name,
      description: description
    });
  });
}); // Update a medical history record

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body2 = req.body,
      user_id = _req$body2.user_id,
      disease_name = _req$body2.disease_name,
      description = _req$body2.description;
  var sql = 'UPDATE MedicalHistory SET user_id = ?, disease_name = ?, description = ? WHERE medical_history_id = ?';
  db.query(sql, [user_id, disease_name, description, id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Medical history updated successfully'
    });
  });
}); // Delete a medical history record

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM MedicalHistory WHERE medical_history_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) throw err;
    res.json({
      message: 'Medical history deleted successfully'
    });
  });
});
module.exports = router;
//# sourceMappingURL=medicalHistory.dev.js.map
