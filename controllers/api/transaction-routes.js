const router = require('express').Router();
const {Transaction, Holding} = require('../../models');

router.get('/', (req, res) => {
    Transaction.findAll({})
    .then(transactions => res.json(transactions))
    .catch(err => console.log(err));
});

module.exports = router;