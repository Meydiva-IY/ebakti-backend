// mentorRoutes.js
const express = require('express');
const router = express.Router();
const { mentorController } = require('../controllers/mentorController');

router.post('/', authMiddleware, adminMiddleware, mentorController.create);
router.get('/', authMiddleware, mentorController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, mentorController.update);
router.delete('/:id', authMiddleware, adminMiddleware, mentorController.delete);

module.exports = router;