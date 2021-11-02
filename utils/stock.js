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

async function userStockQuantity(symbol, userId){
    return Holding.findOne({
        where: {
            symbol: symbol,
            user_id: userId
        }
    })
    .then(response => {
        if(!response){
            return 0;
        }
        return response.get('shares');
    });
}

module.exports = {userHasStock, userStockQuantity};