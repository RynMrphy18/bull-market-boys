const {User, Holding, Transaction} = require('../models');

async function userHasStock(symbol, userId){
    return Holding.count({
        where: {
            symbol: symbol,
            user_id: userId
        }
    })
    .then(count => {
        if(count != 0){
            return true;
        }
        return false;
    });
}

module.exports = userHasStock;