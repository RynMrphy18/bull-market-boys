const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('highscores', {loggedIn: req.session.loggedIn});
});

module.exports = router;