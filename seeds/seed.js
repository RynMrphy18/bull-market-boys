const sequelize = require('../config/connection');
const seedHoldings = require('./holding-seeds');

// TODO: implement user seeds, implement transaction seeds
// const seedUsers = require('./user-seeds');
// const seedTransactions = require('./transaction-seeds');

const seedAll = async () => {
    await sequelize.sync({force: true});
    await seedHoldings();

    // await seedUsers();
    // await seedTransactions();
}

seedAll()
.catch(err => console.log(err));