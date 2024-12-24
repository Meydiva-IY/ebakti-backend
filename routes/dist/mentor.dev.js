"use strict";

// mentorRoutes.js
var express = require('express');

var router = express.Router();

var _require = require('../controllers/mentorController'),
    mentorController = _require.mentorController; // Pastikan ini benar


var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware;

router.post('/', authMiddleware, adminMiddleware, mentorController.create);
router.get('/', authMiddleware, mentorController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, mentorController.update);
router["delete"]('/:id', authMiddleware, adminMiddleware, mentorController["delete"]);
module.exports = router;
//# sourceMappingURL=mentor.dev.js.map
