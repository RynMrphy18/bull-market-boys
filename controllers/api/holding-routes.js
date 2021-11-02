const router = require('express').Router();
const {User, Holding, Transaction} = require('../../models');

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
    .catch(err => console.log(err));
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
        console.log(err);
        return res.status(500).json(err);
    });
});

// creating/incrementing/decrementing a users holding
router.post('/', async (req, res) => {
    // this will create a new holding if the user doesnt own that stock already

    const transactionType = req.body.type;
    const symbol = req.body.symbol;
    const userId = req.session.user_id;
    const quantity = req.body.quantity;

    let cash = await getUserCash(userId);
    // this cost is going to be a parameter passed from the trade.js file, its hardcoded for testing
    let cost = 500;

    // check if the users cash stack is enough to purchase the stock
    if(transactionType === "buy"){
        if(cash >= cost){
            console.log('users has the funds');
            // check if the user has a holding of that stock, if so increment otherwise, create a new holding.
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
            }else{
                console.log('user doesnt have the stock');
                await Holding.create({
                    shares: quantity,
                    symbol: symbol,
                    user_id: userId
                });
            }
        }else{
            // let the user know they don't have the required funds
            console.log('user doesnt have the funds');
        }
    }


    if(transactionType === "sell"){
        Holding.increment({
            // since were incrementing we have to add (negative quantity)
            shares: -quantity,
        },
        {
            where: {
                symbol: symbol,
                user_id: userId
            }
        })
    }

    return res.json();
})

async function getUserCash(userId){
    const user = await User.findOne({where: {id: userId}});
    return user.get("cash");
}

async function userHasStock(symbol, userId){
    return Holding.count({
        where: {
            symbol: symbol,
            user_id: userId
        }
    })
    .then(count => {
        console.log(count);
        if(count != 0){
            return true;
        }
        return false;
    });
}

module.exports = router;