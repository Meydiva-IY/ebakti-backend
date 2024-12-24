// groupRoutes.js
const express = require('express'); // Tambahkan ini
const router = express.Router();
const { groupController } = require('../controllers/groupController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, groupController.create);
router.get('/', authMiddleware, groupController.getAll);

module.exports = router;