const router = require('express').Router();
const {User, Holding, Transaction} = require('../../models');
const {updateUserCash, getUserCash}  = require('../../utils/cash');
const {userHasStock, userStockQuantity} = require('../../utils/stock');

router.get('/', (req, res) => {
    Holding.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Transaction
            }
        ]
    })
    .then(holdings => res.json(holdings))
    // .catch(err => console.log(err));
});

router.get('/:symbol', (req, res) => {
    Holding.findAll({
        where: {
            user_id: req.session.user_id,
            symbol: req.params.symbol
        },
        include: [
            {
                model: Transaction
            }
        ]
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
        return res.status(500).json(err);
    });
});

// creating/incrementing/decrementing/deleting a users holding
router.post('/', async (req, res) => {
    // this will create a new holding if the user doesnt own that stock already

    const transactionType = req.body.type;
    const symbol = req.body.symbol;
    const userId = req.session.user_id;
    const quantity = req.body.quantity;
    const cost = req.body.cost;

    let cash = await getUserCash(userId);

    // check if the users cash stack is enough to purchase the stock
    if(transactionType === "buy"){
        if(cash >= cost){
            console.log('users has the funds');
            // check if the user has a holding of that stock, if so increment otherwise, create a new holding.
            // deduct cost from the users cash stack
            updateUserCash(-cost, userId);
            if(await userHasStock(symbol, userId)){
                console.log('user has the stock, updating existing holding');
                // find the holding thats being updated
                let holding = await Holding.findOne({where: {symbol: symbol, user_id: userId}});
                // increment the shares of that holding
                await holding.increment({shares: quantity});
                return res.status(200).json();
            }else{
                console.log('user doesnt have the stock, creating a new holding');
                await Holding.create({where: {symbol: symbol, user_id: userId, shares: quantity}});
                return res.status(200).json();
            }
        }else{
            // let the user know they don't have the required funds
            res.statusMessage = 'User does not have the funds!';
            return res.status(500).json();
        }
    }

    // check if the user has the stock and if they have the amount they want to sell
    if(transactionType === "sell"){
        // check if the user has the stock theyre trying to sell & if the quantity they have is greater than or equal to the amount trying to be sold
        if(await userHasStock(symbol, userId) && await userStockQuantity(symbol, userId) >= quantity){
            console.log('user has enough shares to sell this amount');
            // find the holding thats being updated
            let holding = await Holding.findOne({where: {symbol: symbol, user_id: userId}});
            // decrement the shares of that holding
            await holding.increment({shares: -quantity});
            // update holding variable after decrementing
            holding = await Holding.findOne({where: {symbol: symbol, user_id: userId}});
            // if the number of shares are == 0 then delete the holding
            if(holding.shares == 0){
                console.log('shares = 0, destroying this holding');
                await holding.destroy();
            }
            return res.status(200).json();
        }else{
            // let the user know they don't have enough shares to sell the amount they've entered
            res.statusMessage = 'User does not have enough shares to sell!';
            return res.status(500).json();
        }
    }
});

module.exports = router;