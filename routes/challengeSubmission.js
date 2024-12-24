// challengeSubmissionRoutes.js
const express = require('express');
const router = express.Router();
const { challengeSubmissionController } = require('../controllers/challengeSubmissionController');
const upload = multer({ dest: 'uploads/challenge-submissions' });

router.post('/', authMiddleware, upload.single('submission_file'), challengeSubmissionController.submit);
router.put('/:id/grade', authMiddleware, adminMiddleware, challengeSubmissionController.grade);
router.get('/user/:userId', authMiddleware, challengeSubmissionController.getSubmissions);

module.exports = router;