const router = require('express').Router();
const yahooFinance = require('yahoo-finance');

// query yahoo finance for stock data
// update stock table with new data queried
router.get('/', async (req, res) => {
    let symbol = req.body.symbol;
    console.log(symbol);

    let stockData = await yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail' ]
    });

    console.log(stockData);
    res.json(stockData);
});

module.exports = router;