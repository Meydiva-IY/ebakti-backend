// challengeRoutes.js
const express = require('express');
const router = express.Router();
const { challengeController } = require('../controllers/challengeController');
const upload = multer({ dest: 'uploads/challenges' });

router.post('/', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.create);
router.get('/', authMiddleware, challengeController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.update);

module.exports = router;