const router = require('express').Router();
const sequelize = require('../../config/connection');
const {User, Holding, Transaction} = require('../../models');

// return the top ten stocks with the most (activity) transactions
router.get('/stock', (req, res) => {
    Transaction.count({
        group: 'symbol',
        attributes: ['symbol']
    })
    .then(transactions => {
        transactions = transactions.slice(0,10);
        res.json(transactions);
    });
});

// return the player with the highest net assets and least amount of trades
router.get('/user', (req, res) => {
    User.findOne({
        where: {
            // net assets is the greatest
        }
    })
    .then(user => res.json(user))
});

module.exports = router;