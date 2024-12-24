"use strict";

// attendanceRoutes.js
var express = require('express');

var router = express.Router();

var _require = require('../controllers/attendanceController'),
    attendanceController = _require.attendanceController; // Ensure this is correct


var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware;

router.post('/', authMiddleware, attendanceController.create);
router.get('/:userId', authMiddleware, attendanceController.getByUser); // Ensure getByUser  is defined in attendanceController

module.exports = router;
//# sourceMappingURL=attendance.dev.js.map
