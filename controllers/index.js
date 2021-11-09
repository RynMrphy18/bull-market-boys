const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute');
const searchRoutes = require('./searchRoute');
const transactionRoutes = require('./transactionRoute');
const highscoresRoutes = require('./highscoreRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/transaction', transactionRoutes);
router.use('/search', searchRoutes);
// router.use('/highscores', highscoresRoutes);

router.use((req, res) => {
    return res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;