"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// groupController.js
var db = require('../config/db');

var groupController = {
  create: function create(req, res) {
    var _req$body, group_name, mentor1_id, mentor2_id, _ref, _ref2, result;

    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, group_name = _req$body.group_name, mentor1_id = _req$body.mentor1_id, mentor2_id = _req$body.mentor2_id;
            _context.next = 4;
            return regeneratorRuntime.awrap(db.query('INSERT INTO `group` (group_name, mentor1_id, mentor2_id) VALUES (?, ?, ?)', [group_name, mentor1_id, mentor2_id]));

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
    var _ref3, _ref4, groups;

    return regeneratorRuntime.async(function getAll$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(db.query('SELECT * FROM `group`'));

          case 3:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            groups = _ref4[0];
            res.json(groups);
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
  }
};
module.exports = {
  groupController: groupController
}; // Pastikan ini ada
//# sourceMappingURL=groupController.dev.js.map
