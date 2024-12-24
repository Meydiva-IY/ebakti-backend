
// attendanceRoutes.js
const router = express.Router();
const { attendanceController } = require('../controllers/attendanceController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, attendanceController.create);
router.get('/:userId', authMiddleware, attendanceController.getByUser);

module.exports = router;