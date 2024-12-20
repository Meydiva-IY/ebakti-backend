"use strict";

var express = require('express');

var router = express.Router();

var userController = require('../controllers/userController');

var _require = require('../middleware/validate'),
    validateUser = _require.validateUser,
    handleValidationErrors = _require.handleValidationErrors;

var _require2 = require('../middleware/auth'),
    authenticateToken = _require2.authenticateToken;

var logger = require('../middleware/logger'); // Rute untuk user


router.use(logger); // Menggunakan middleware logger untuk semua rute

router.post('/', validateUser, handleValidationErrors, userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', authenticateToken, userController.getAllUsers);
router.put('/:id', authenticateToken, validateUser, handleValidationErrors, userController.updateUser);
router["delete"]('/:id', authenticateToken, userController.deleteUser);
module.exports = router;
//# sourceMappingURL=user.dev.js.map
