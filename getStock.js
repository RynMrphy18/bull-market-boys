const yahooFinance = require('yahoo-finance');
const symbol = 'AAPL';

yahooFinance.quote({
    symbol: symbol,
    modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
}).then((stockData) => {
    let stockInfo = {
        name: stockData.price.longName,
        symbol: stockData.price.symbol,
        price: stockData.price.regularMarketPrice,
        open: stockData.summaryDetail.open,
        high: stockData.summaryDetail.dayHigh,
        low: stockData.summaryDetail.dayLow,
        yearHigh: stockData.summaryDetail.fiftyTwoWeekHigh,
        yearLow: stockData.summaryDetail.fiftyTwoWeekLow,
    }
    console.log(stockInfo);
})