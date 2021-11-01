const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute');
const searchRoutes = require('./searchRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/search', searchRoutes);

router.use((req, res) => {
    return res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;