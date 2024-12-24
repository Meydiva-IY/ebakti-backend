// taskSubmissionRoutes.js
const express = require('express');
const router = express.Router();
const { taskSubmissionController } = require('../controllers/taskSubmissionController'); // Ensure this import is correct
const multer = require('multer'); // Import multer
const upload = multer({ dest: 'uploads/submissions' });
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Import authMiddleware and adminMiddleware

router.post('/', authMiddleware, upload.single('submission_file'), taskSubmissionController.submit);
router.put('/:id/grade', authMiddleware, adminMiddleware, taskSubmissionController.grade);
router.get('/user/:userId', authMiddleware, taskSubmissionController.getByUser  );

module.exports = router;