// taskSubmissionRoutes.js
const express = require('express');
const router = express.Router();
const { taskSubmissionController } = require('../controllers/taskSubmissionController');
const upload = multer({ dest: 'uploads/submissions' });

router.post('/', authMiddleware, upload.single('submission_file'), taskSubmissionController.submit);
router.put('/:id/grade', authMiddleware, adminMiddleware, taskSubmissionController.grade);
router.get('/user/:userId', authMiddleware, taskSubmissionController.getByUser);

module.exports = router;