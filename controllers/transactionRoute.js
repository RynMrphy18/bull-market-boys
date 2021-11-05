const router = require('express').Router();
const {Transaction, Holding} = require('../models');
const getStock = require('../utils/getStock')
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Transaction.findAll({})
    .then(transactions => res.json(transactions))
    .catch(err => console.log(err));
});

router.get('/:symbol', withAuth, async (req, res) => {
    const symbol = req.params.symbol;
    Transaction.findAll({where: {symbol: symbol, user_id: req.session.user_id}})
    .then(transactions => {
        if(transactions.length > 0){
            let stock = getStock(symbol);
            return res.render('transactions', {transactions, stock, loggedIn: req.session.loggedIn});
        }
        return res.status(404).json('No transactions found!');
    });
})

module.exports = router;