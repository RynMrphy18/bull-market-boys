const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const {User, Holding} = require('../models');

// display the users main screen (once logged in)
router.get('/', withAuth, (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Holding
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({message: 'No user found with this id'});
        }
        let user = dbUserData.dataValues;
        let holdings = dbUserData.holdings;
        const symbols = holdings.map(holding => holding.dataValues.symbol);
        console.log(`
    = = = = = = = = = = = = = = =
    ${user.username}'s holdings: ${symbols}
    = = = = = = = = = = = = = = =
        `);
        return res.render('dashboard', {user, holdings, symbols: symbols, loggedIn: req.session.loggedIn, dashboard: true});
    })
    .catch(err => console.log(err));
});

module.exports = router;