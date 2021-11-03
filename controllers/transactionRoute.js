const router = require('express').Router();
const {Transaction, Holding} = require('../models');
const getStock = require('../utils/getStock')

router.get('/', (req, res) => {
    Transaction.findAll({})
    .then(transactions => res.json(transactions))
    .catch(err => console.log(err));
});

router.get('/:symbol', (req, res) => {
    const symbol = req.params.symbol;
    Transaction.findAll({where: {symbol: symbol, user_id: req.session.user_id}})
    .then(transactions => {
        if(transactions.length > 0){
            let stockData = getStock(symbol);
            return res.render('transactions', {transactions, stockData, loggedIn: req.session.loggedIn});
        }
        return res.status(404).json('No transactions found!');
    });
})

module.exports = router;