const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const {User} = require('../models');

// display the users main screen (once logged in)
router.get('/', withAuth, (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id
        },
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({message: 'No user found with this id'});
        }
        console.log(user);
        return res.render('dashboard', {user, loggedIn: req.session.loggedIn});
    })
    .catch(err => console.log(err));
});

module.exports = router;