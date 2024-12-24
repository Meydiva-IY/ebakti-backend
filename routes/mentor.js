// mentorRoutes.js
const express = require('express');
const router = express.Router();
const { mentorController } = require('../controllers/mentorController'); // Pastikan ini benar
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, mentorController.create);
router.get('/', authMiddleware, mentorController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, mentorController.update);
router.delete('/:id', authMiddleware, adminMiddleware, mentorController.delete);

module.exports = router;