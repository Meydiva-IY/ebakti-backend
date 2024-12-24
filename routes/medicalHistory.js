// medicalHistoryRoutes.js
const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../controllers/medicalHistoryController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, medicalHistoryController.create);
router.get('/user/:userId', authMiddleware, medicalHistoryController.getByUserId);
router.put('/:id', authMiddleware, medicalHistoryController.update);
router.delete('/:id', authMiddleware, medicalHistoryController.delete);

module.exports = router;