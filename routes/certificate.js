
// certificateRoutes.js
const express = require('express');
const router = express.Router();
const { certificateController } = require('../controllers/certificateController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/generate/:userId', authMiddleware, certificateController.generateCertificate);
router.get('/check/:userId', authMiddleware, certificateController.checkEligibility);

module.exports = router;
