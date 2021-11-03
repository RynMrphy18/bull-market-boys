const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const withAuth = require('../utils/auth');

// query yahoo finance for stock data
router.get('/:symbol', withAuth, async (req, res) => {

    const symbol = req.params.symbol.toUpperCase();

    yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail' ]
    })
    .then(stockData => {
        // create an object with important info from the stock data

        let stock = {
            symbol: symbol,
            price: stockData.price.regularMarketPrice.toFixed(2),
            open: stockData.summaryDetail.open,
            // close: stockData.summaryDetail.close,
            high: stockData.summaryDetail.dayHigh,
            low: stockData.summaryDetail.dayLow,
            yearHigh: stockData.summaryDetail.fiftyTwoWeekHigh,
            yearLow: stockData.summaryDetail.fiftyTwoWeekLow,
        }
        // render the single stock page with the information from above
        return res.render('single-stock', {stock, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        // if theres an error fetching the info from yahoofinanace then render an error screen
        // need to adjust this to work properly
        res.statusMessage = 'No stock with that symbol!';
        return res.status(400).json();
    });
});

module.exports = router;