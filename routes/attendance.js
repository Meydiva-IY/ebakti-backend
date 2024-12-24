// attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { attendanceController } = require('../controllers/attendanceController'); // Ensure this is correct
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, attendanceController.create);
router.get('/:userId', authMiddleware, attendanceController.getByUser ); // Ensure getByUser  is defined in attendanceController

module.exports = router;