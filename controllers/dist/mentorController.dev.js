"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// mentorController.js
var db = require('../config/db');

var mentorController = {
  create: function create(req, res) {
    var name, _ref, _ref2, result;

    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            name = req.body.name;
            _context.next = 4;
            return regeneratorRuntime.awrap(db.query('INSERT INTO mentor (name) VALUES (?)', [name]));

          case 4:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            result = _ref2[0];
            res.status(201).json({
              id: result.insertId
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              error: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  getAll: function getAll(req, res) {
    var _ref3, _ref4, mentors;

    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(db.query('SELECT * FROM mentor ORDER BY name'));

          case 3:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            mentors = _ref4[0];
            res.json(mentors);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              error: _context2.t0.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  update: function update(req, res) {
    var name;
    return regeneratorRuntime.async(function update$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            name = req.body.name;
            _context3.next = 4;
            return regeneratorRuntime.awrap(db.query('UPDATE mentor SET name = ? WHERE mentor_id = ?', [name, req.params.id]));

          case 4:
            res.json({
              message: 'Mentor updated'
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              error: _context3.t0.message
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  "delete": function _delete(req, res) {
    return regeneratorRuntime.async(function _delete$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(db.query('DELETE FROM mentor WHERE mentor_id = ?', [req.params.id]));

          case 3:
            res.json({
              message: 'Mentor deleted'
            });
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              error: _context4.t0.message
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }
};
module.exports = {
  mentorController: mentorController
}; // Pastikan ini ada
//# sourceMappingURL=mentorController.dev.js.map
