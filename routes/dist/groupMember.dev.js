"use strict";

// groupMemberRoutes.js
var express = require('express');

var router = express.Router();

var _require = require('../controllers/groupMemberController'),
    groupMemberController = _require.groupMemberController; // Ensure this import is correct


var _require2 = require('../middleware/authMiddleware'),
    authMiddleware = _require2.authMiddleware,
    adminMiddleware = _require2.adminMiddleware;

router.post('/', authMiddleware, adminMiddleware, groupMemberController.add);
router.get('/group/:groupId', authMiddleware, groupMemberController.getByGroup);
router["delete"]('/:groupId/:userId', authMiddleware, adminMiddleware, groupMemberController.remove);
module.exports = router;
//# sourceMappingURL=groupMember.dev.js.map
