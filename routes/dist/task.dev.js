"use strict";

// taskRoutes.js
var express = require('express');

var multer = require('multer'); // Import multer


var _require = require('../middleware/authMiddleware'),
    authMiddleware = _require.authMiddleware,
    adminMiddleware = _require.adminMiddleware; // Import authMiddleware and adminMiddleware


var router = express.Router();

var _require2 = require('../controllers/taskController'),
    taskController = _require2.taskController; // Ensure this import is correct


var upload = multer({
  dest: 'uploads/tasks'
});
router.post('/', authMiddleware, adminMiddleware, upload.single('task_image'), taskController.create);
router.get('/', authMiddleware, taskController.getAll);
router.get('/:id', authMiddleware, taskController.getById);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('task_image'), taskController.update);
router["delete"]('/:id', authMiddleware, adminMiddleware, taskController["delete"]);
module.exports = router;
//# sourceMappingURL=task.dev.js.map
