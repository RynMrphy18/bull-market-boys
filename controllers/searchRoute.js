const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const withAuth = require('../utils/auth');

// query yahoo finance for stock data
router.get('/:symbol', withAuth, async (req, res) => {

    const symbol = req.params.symbol;

    yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail' ]
    })
    .then(response => {
        // create an object with important info from the stock data
        let stockData = response;

        let stock = {
            symbol: symbol,
            price: stockData.price.regularMarketPrice,
            open: stockData.summaryDetail.open,
            // close: stockData.summaryDetail.close,
            high: stockData.summaryDetail.dayHigh,
            low: stockData.summaryDetail.dayLow,
            yearHigh: stockData.summaryDetail.fiftyTwoWeekHigh,
            yearLow: stockData.summaryDetail.fiftyTwoWeekLow,
        }
        // redner the single stock page with the information from above
        return res.render('single-stock', {stock});
    })
    .catch(err => {
        // if theres an error fetching the info from yahoofinanace then render an error screen
        return res.status(400).json({ message: 'No stock with that symbol!' });
    });
});

module.exports = router;