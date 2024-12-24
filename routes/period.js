// periodRoutes.js
const router = express.Router();
const { periodController } = require('../controllers/periodController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, periodController.create);
router.get('/', authMiddleware, periodController.getAll);

module.exports = router;