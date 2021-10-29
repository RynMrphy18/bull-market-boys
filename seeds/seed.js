const sequelize = require('../config/connection');
const seedHoldings = require('./holding-seeds');
const seedUsers = require('./user-seeds');
const seedTransactions = require('./transaction-seeds');

const seedAll = async () => {
    await sequelize.sync({force: true});
    await seedUsers();
    await seedTransactions();
    await seedHoldings();
}

seedAll()
.catch(err => console.log(err));