const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser , handleValidationErrors } = require('../middleware/validate');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../middleware/logger');

// Rute untuk user
router.use(logger); // Menggunakan middleware logger untuk semua rute

router.post('/', validateUser , handleValidationErrors, userController.createUser );
router.post('/login', userController.loginUser );
router.get('/', authenticateToken, userController.getAllUsers);
router.put('/:id', authenticateToken, validateUser , handleValidationErrors, userController.updateUser );
router.delete('/:id', authenticateToken, userController.deleteUser );

module.exports = router;