const router = require('express').Router();
const withAuth = require('../utils/auth.js');

// display the users main screen (once logged in)
router.get('/', withAuth, (req, res) => {
    return res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;