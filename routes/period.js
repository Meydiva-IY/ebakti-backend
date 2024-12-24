// period.js
const express = require('express');
const router = express.Router();
const { periodController } = require('../controllers/periodController'); // Pastikan ini benar
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, periodController.create);
router.get('/', authMiddleware, periodController.getAll); // Pastikan getAll ada di periodController

module.exports = router;