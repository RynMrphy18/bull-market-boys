const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const holdingRoutes = require('./holding-routes.js');

router.use('/users', userRoutes);
router.use('/holdings', holdingRoutes);

module.exports = router;