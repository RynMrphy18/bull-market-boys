const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const holdingRoutes = require('./holding-routes.js');
const stockRoutes = require('./stock-routes.js');
const transactionRoutes = require('./transaction-routes');

router.use('/users', userRoutes);
router.use('/holdings', holdingRoutes);
router.use('/stocks', stockRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;