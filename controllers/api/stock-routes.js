const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const {Stock} = require('../../models');

// query yahoo finance for stock data
// update stock table with new data queried
router.get('/', async (req, res) => {
    let symbol = req.body.symbol;

    let stockData = await yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail' ]
    });

    if(!stockData){
        return res.status(400).json({ message: 'No stock with that symbol!' });
    }

    // TODO: if stock exists in the table then it needs to be UPDATED not created...
    Stock.create({
        symbol: symbol,
        price: stockData.price.regularMarketPrice,
        open: stockData.summaryDetail.open,
        close: stockData.summaryDetail.close,
        high: stockData.summaryDetail.dayHigh,
        low: stockData.summaryDetail.dayLow,
        yearHigh: stockData.summaryDetail.fiftyTwoWeekHigh,
        yearLow: stockData.summaryDetail.fiftyTwoWeekLow,
    })
    .then(response => {
        return res.json(response);
    })
    .catch(err => console.log(err));
});

module.exports = router;