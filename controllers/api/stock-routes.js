const router = require('express').Router();
const {User, Holding, Transaction} = require('../../models');

router.get('/:symbol', (req, res) => {
    Holding.findAll({
        where: {
            symbol: req.params.symbol
        }
    })
    .then(holdings => {
        if(holdings.length < 1){
            return res.status(404).json({message: 'No holdings found with this symbol.'});
        }
        return res.render('single-stock', {
            holdings: holdings.map(holding => holding.toJSON())
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
})

module.exports = router;