"use strict";

// taskSubmissionRoutes.js
var express = require('express');

var router = express.Router();

var _require = require('../controllers/taskSubmissionController'),
    taskSubmissionController = _require.taskSubmissionController; // Ensure this import is correct


var multer = require('multer'); // Import multer


var upload = multer({
  dest: 'uploads/submissions'
});

var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware; // Import authMiddleware and adminMiddleware


router.post('/', authMiddleware, upload.single('submission_file'), taskSubmissionController.submit);
router.put('/:id/grade', authMiddleware, adminMiddleware, taskSubmissionController.grade);
router.get('/user/:userId', authMiddleware, taskSubmissionController.getByUser);
module.exports = router;
//# sourceMappingURL=taskSubmission.dev.js.map
