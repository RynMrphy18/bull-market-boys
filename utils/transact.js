const {Transaction} = require('../models');

const newTransaction = (symbol, cost, quantity, transactionType, userId, holdingId) => {
    Transaction.create(
        {
            symbol: symbol,
            price: cost,
            shares: quantity,
            type: transactionType,
            user_id: userId,
            holding_id: holdingId
        }
    )
};

module.exports = newTransaction