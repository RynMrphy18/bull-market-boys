const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const {User, Holding} = require('../models');
const {Op} = require('sequelize');

// display the users main screen (once logged in)
router.get('/', withAuth, (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id,
        },
        include: [
            {
                model: Holding,
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({message: 'No user found with this id'});
        }
        let user = dbUserData.dataValues;
        let holdings = dbUserData.holdings;
        // filter out the holdings where the number of shares equals 0
        holdings = holdings.filter(holding => holding.shares != 0);
        const symbols = holdings.map(holding => holding.dataValues.symbol);
        return res.render('dashboard', {user, holdings, symbols: symbols, loggedIn: req.session.loggedIn, dashboard: true});
    })
    .catch(err => console.log(err));
});

module.exports = router;