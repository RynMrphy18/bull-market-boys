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
                console.log('user has the stock');
                Holding.increment({
                    shares: quantity
                }, 
                {
                    where: {
                        symbol: symbol,
                        user_id: userId
                    }
                });
                return res.status(200).json();
            }else{
                console.log('user doesnt have the stock');
                await Holding.create({
                    shares: quantity,
                    symbol: symbol,
                    user_id: userId
                });
                return res.status(200).json();
            }
        }else{
            // let the user know they don't have the required funds
            // return res.status(400).send('User does not have the funds!');
            res.statusMessage = 'User does not have the funds!';
            return res.status(500).json();
        }
    }

    // check if the user has the stock and if they have the amount they want to sell
    if(transactionType === "sell"){
        if(await userHasStock(symbol, userId) && await userStockQuantity(symbol, userId) >= quantity){
            console.log('user has enough shares to sell this armount');
            Holding.increment({
                // since were incrementing we have to add (negative quantity)
                shares: -quantity,
            },
            {
                where: {
                    symbol: symbol,
                    user_id: userId
                }
            });

            return res.status(200).json();
        }else{
            res.statusMessage = 'User does not have enough shares to sell!';
            return res.status(500).json();
        }
    }
    // after the user sells their stock check holding shares amount
    // if holding shares amount == 0, then delete that holding from the table
});

module.exports = router;