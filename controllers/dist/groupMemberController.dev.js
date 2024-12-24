"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require('../config/db');

var groupMemberController = {
  add: function add(req, res) {
    var _req$body, group_id, user_id;

    return regeneratorRuntime.async(function add$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, group_id = _req$body.group_id, user_id = _req$body.user_id;
            _context.next = 4;
            return regeneratorRuntime.awrap(db.query('INSERT INTO group_member (group_id, user_id) VALUES (?, ?)', [group_id, user_id]));

          case 4:
            res.status(201).json({
              message: 'Member added'
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              error: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getByGroup: function getByGroup(req, res) {
    var _ref, _ref2, members;

    return regeneratorRuntime.async(function getByGroup$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(db.query("SELECT u.* FROM user u\n         JOIN group_member gm ON u.user_id = gm.user_id\n         WHERE gm.group_id = ?", [req.params.groupId]));

          case 3:
            _ref = _context2.sent;
            _ref2 = _slicedToArray(_ref, 1);
            members = _ref2[0];
            res.json(members);
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
  remove: function remove(req, res) {
    return regeneratorRuntime.async(function remove$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(db.query('DELETE FROM group_member WHERE group_id = ? AND user_id = ?', [req.params.groupId, req.params.userId]));

          case 3:
            res.json({
              message: 'Member removed'
            });
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              error: _context3.t0.message
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }
};
module.exports = {
  groupMemberController: groupMemberController
}; // Ensure this line is present
//# sourceMappingURL=groupMemberController.dev.js.map
