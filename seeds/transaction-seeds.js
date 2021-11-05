const { Transaction } = require("../models")

const transactions = [
    {
        symbol: 'AAPL',
        price: 400,
        shares: 420,
        type: 'buy',
        user_id: 1,
        holding_id: 1
    },
    {
        symbol: 'AAPL',
        price: 200,
        shares: 120,
        type: 'buy',
        user_id: 2,
        holding_id: 2
    },
    {
        symbol: 'TSLA',
        price: 10,
        shares: 40,
        type: 'sell',
        user_id: 2,
        holding_id: 4
    },
    {
        symbol: 'MSFT',
        price: 50,
        shares: 10,
        type: 'sell',
        user_id: 1,
        holding_id: 3
    },
    {
        symbol: 'AAPL',
        price: 700,
        shares: 220,
        type: 'sell',
        user_id: 1,
        holding_id: 1
    }
]

const seedTransactions = () => Transaction.bulkCreate(transactions);

module.exports = seedTransactions;