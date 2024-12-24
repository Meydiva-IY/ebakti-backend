// taskRoutes.js
const express = require('express');
const multer = require('multer'); // Import multer
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware'); // Import authMiddleware and adminMiddleware
const router = express.Router();
const { taskController } = require('../controllers/taskController'); // Ensure this import is correct
const upload = multer({ dest: 'uploads/tasks' });

router.post('/', authMiddleware, adminMiddleware, upload.single('task_image'), taskController.create);
router.get('/', authMiddleware, taskController.getAll);
router.get('/:id', authMiddleware, taskController.getById);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('task_image'), taskController.update);
router.delete('/:id', authMiddleware, adminMiddleware, taskController.delete);

module.exports = router;