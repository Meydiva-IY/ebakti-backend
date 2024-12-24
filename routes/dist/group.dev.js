"use strict";

// groupRoutes.js
var express = require('express'); // Tambahkan ini


var router = express.Router();

var _require = require('../controllers/groupController'),
    groupController = _require.groupController;

var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware;

router.post('/', authMiddleware, adminMiddleware, groupController.create);
router.get('/', authMiddleware, groupController.getAll);
module.exports = router;
//# sourceMappingURL=group.dev.js.map
