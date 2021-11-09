const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const holdingRoutes = require('./holding-routes.js');
const highscoreRoutes = require('./highscore-routes.js');

router.use('/users', userRoutes);
router.use('/holdings', holdingRoutes);
// router.use('/highscores', highscoreRoutes);

module.exports = router;