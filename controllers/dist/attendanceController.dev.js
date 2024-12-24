"use strict";

// attendanceController.js
var attendanceController = {
  create: function create(req, res) {
    var _req$body, userId, status;

    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              _req$body = req.body, userId = _req$body.userId, status = _req$body.status; // Assuming you send userId and status in the request body
              // Insert attendance logic here

              res.status(201).json({
                message: 'Attendance created successfully'
              });
            } catch (error) {
              res.status(500).json({
                error: error.message
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getByUser: function getByUser(req, res) {
    var userId;
    return regeneratorRuntime.async(function getByUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Corrected function name
            try {
              userId = req.params.userId; // Implementation for getting attendance by user
              // Example implementation (you can modify as needed)

              res.json({
                message: "Attendance data for user ".concat(userId)
              });
            } catch (error) {
              res.status(500).json({
                error: error.message
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
module.exports = {
  attendanceController: attendanceController
};
//# sourceMappingURL=attendanceController.dev.js.map
