const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }
    return res.render('index');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }
    return res.render('signup');
});

module.exports = router;