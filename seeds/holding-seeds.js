const { Holding } = require("../models")

const holdings = [
    {
        symbol: 'AAPL',
        shares: 420,
        user_id: 1
    },
    {
        symbol: 'AAPL',
        shares: 69,
        user_id: 2
    },
    {
        symbol: 'TSLA',
        shares: 400,
        user_id: 1
    },
    {
        symbol: 'TSLA',
        shares: 60,
        user_id: 2
    }
]

const seedHoldings = () => Holding.bulkCreate(holdings);

module.exports = seedHoldings;