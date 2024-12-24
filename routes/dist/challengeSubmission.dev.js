"use strict";

// challengeSubmissionRoutes.js
var express = require('express');

var router = express.Router();

var _require = require('../controllers/challengeSubmissionController'),
    challengeSubmissionController = _require.challengeSubmissionController; // Ensure this import is correct


var multer = require('multer'); // Import multer


var upload = multer({
  dest: 'uploads/challenge-submissions'
});

var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware; // Import authMiddleware and adminMiddleware


router.post('/', authMiddleware, upload.single('submission_file'), challengeSubmissionController.submit);
router.put('/:id/grade', authMiddleware, adminMiddleware, challengeSubmissionController.grade);
router.get('/user/:userId', authMiddleware, challengeSubmissionController.getSubmissions);
module.exports = router;
//# sourceMappingURL=challengeSubmission.dev.js.map
