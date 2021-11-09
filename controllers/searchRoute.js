const router = require('express').Router();
const yahooFinance = require('yahoo-finance');
const withAuth = require('../utils/auth');
const getStock = require('../utils/getStock');
const validate = require('../utils/validate');

// refreshing on the /search page will bring the user back to the dashboard instead of throwing wrong routes!
router.get('/', (req, res) => {
    res.redirect('/dashboard');
});

router.post('/', withAuth, async (req, res) => {
    const symbol = req.body.symbol;
    // check if the symbol is valid, ONLY LETTERS
    if(await validate(symbol)){
        // try to fetch the stock data
        try{
            let stock = await getStock(symbol);
            // if stock data is valid then render the stock page with the data
            return res.render('single-stock', {stock, loggedIn: req.session.loggedIn});
        }catch(error){
            // return the user to the dashboard and display the error
            return res.redirect('/dashboard');
        }
    }else{
        // return the user to the dashboard if symbol invalid
        return res.redirect('/dashboard');
    }
});

module.exports = router;