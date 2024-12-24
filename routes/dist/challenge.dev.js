"use strict";

// challengeRoutes.js
var express = require('express');

var multer = require('multer'); // Add this line to import multer


var _require = require('../middleware/authMiddleware'),
    authMiddleware = _require.authMiddleware,
    adminMiddleware = _require.adminMiddleware; // Import authMiddleware and adminMiddleware


var router = express.Router();

var _require2 = require('../controllers/challengeController'),
    challengeController = _require2.challengeController;

var upload = multer({
  dest: 'uploads/challenges'
});
router.post('/', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.create);
router.get('/', authMiddleware, challengeController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('challenge_image'), challengeController.update);
module.exports = router;
//# sourceMappingURL=challenge.dev.js.map
