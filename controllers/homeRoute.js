const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('index', {loggedIn: req.session.loggedIn});
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }
    return res.render('login', {login: true});
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/dashboard');
    }
    return res.render('signup', {signup: true});
});

module.exports = router;