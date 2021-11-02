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

    let cash = await getUserCash(req.session.user_id);
    // this cost is going to be a parameter passed from the trade.js file, its hardcoded for testing
    let cost = 500;

    // check if the users cash stack is enough to purchase the stock
    if(transactionType === "buy"){
        if(cash >= cost){
            console.log('users has the funds')
            // check if the user has a holding of that stock, if so increment otherwise, create a new holding.
            if(await userHasStock(req.body.symbol, req.session.user_id)){
                console.log('user has the stock')
                Holding.increment({
                    shares: req.body.quantity
                }, 
                {
                    where: {
                        symbol: req.body.symbol,
                        user_id: req.session.user_id
                    }
                });
            }else{
                console.log('user doesnt have the stock')
                await Holding.create({
                    shares: req.body.quantity,
                    symbol: req.body.symbol,
                    user_id: req.session.user_id
                });
            }
        }else{
            // let the user know they don't have the required funds
            console.log('user doesnt have the funds')
        }
    }


    if(transactionType === "sell"){
        Holding.increment({
            shares: -req.body.quantity
        }, 
        {
            where: {
                symbol: req.body.symbol,
                user_id: req.session.user_id
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
    Holding.findOne({
        where: {
            symbol: symbol,
            user_id: userId
        }
    })
    .then(response => {
        // return a boolean if that user has a holding that matches the symbol passed in
        console.log("this is the response: !!!!!!!" + response);
        if(!response){
            return true;
        }
        return false;
    });
}

module.exports = router;