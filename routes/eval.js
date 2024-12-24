
// evalRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

const { evalController } = require('../controllers/evalController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/calculate', authMiddleware, adminMiddleware, evalController.calculateEvaluations);
router.get('/user/:userId', authMiddleware, evalController.getUserEvaluation);
router.get('/', authMiddleware, adminMiddleware, evalController.getAllEvaluations);

module.exports = router;