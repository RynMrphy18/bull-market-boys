const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;