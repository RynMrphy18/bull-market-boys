const router = require('express').Router();
const {Transaction, Holding} = require('../models');

router.get('/', (req, res) => {
    Transaction.findAll({})
    .then(transactions => res.json(transactions))
    .catch(err => console.log(err));
});

router.get('/:symbol', (req, res) => {
    Transaction.findAll({where: {symbol: req.params.symbol, user_id: req.session.user_id}})
    .then(transactions => {
        if(transactions.length > 0){
            return res.render('transactions', {transactions});
        }
        return res.status(404).json('No transactions found!');
    });
})

module.exports = router;