// groupMemberRoutes.js
const express = require('express');
const router = express.Router();
const { groupMemberController } = require('../controllers/groupMemberController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, groupMemberController.add);
router.get('/group/:groupId', authMiddleware, groupMemberController.getByGroup);
router.delete('/:groupId/:userId', authMiddleware, adminMiddleware, groupMemberController.remove);

module.exports = router;
