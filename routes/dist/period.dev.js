"use strict";

// period.js
var express = require('express'); // Tambahkan ini


var router = express.Router();

var _require = require('../controllers/periodController'),
    periodController = _require.periodController;

var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware;

router.post('/', authMiddleware, adminMiddleware, periodController.create);
router.get('/', authMiddleware, periodController.getAll);
module.exports = router;
//# sourceMappingURL=period.dev.js.map
