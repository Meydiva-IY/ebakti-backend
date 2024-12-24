// challengeRoutes.js
const express = require('express');
const multer = require('multer'); // Add this line to import multer
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Import authMiddleware and adminMiddleware
const router = express.Router();
const { challengeController } = require('../controllers/challengeController');
const upload = multer({ dest: 'uploads/challenges' });

router.post('/', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.create);
router.get('/', authMiddleware, challengeController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.update);

module.exports = router;