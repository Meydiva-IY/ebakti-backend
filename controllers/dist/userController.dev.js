"use strict";

var db = require('../config/db');

var jwt = require('jsonwebtoken'); // Create a new user


var createUser = function createUser(req, res) {
  var _req$body = req.body,
      role = _req$body.role,
      email = _req$body.email,
      password = _req$body.password;
  var sql = 'INSERT INTO User (role, email, password) VALUES (?, ?, ?)';
  db.query(sql, [role, email, password], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(201).json({
      id: result.insertId,
      role: role,
      email: email
    });
  });
}; // User login


var loginUser = function loginUser(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  var sql = 'SELECT * FROM User WHERE email = ? AND password = ?';
  db.query(sql, [email, password], function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    var user = results[0];
    var token = jwt.sign({
      id: user.user_id,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({
      token: token
    });
  });
}; // Get all users


var getAllUsers = function getAllUsers(req, res) {
  db.query('SELECT * FROM User', function (err, results) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);
  });
}; // Update a user


var updateUser = function updateUser(req, res) {
  var id = req.params.id;
  var _req$body3 = req.body,
      role = _req$body3.role,
      email = _req$body3.email,
      password = _req$body3.password;
  var sql = 'UPDATE User SET role = ?, email = ?, password = ? WHERE user_id = ?';
  db.query(sql, [role, email, password, id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User  not found'
      });
    }

    res.json({
      message: 'User  updated successfully'
    });
  });
}; // Delete a user


var deleteUser = function deleteUser(req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM User WHERE user_id = ?';
  db.query(sql, [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User  not found'
      });
    }

    res.json({
      message: 'User  deleted successfully'
    });
  });
};

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getAllUsers: getAllUsers,
  updateUser: updateUser,
  deleteUser: deleteUser
};
//# sourceMappingURL=userController.dev.js.map
