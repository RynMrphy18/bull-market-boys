const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('dashboard');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    return res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    return res.render('signup');
});

module.exports = router;