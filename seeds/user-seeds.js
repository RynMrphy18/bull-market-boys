const { User } = require("../models")

const users = [
    {
        username: 'mikejones',
        password: 'mikejones',
        cash: 420,
    },
    {
        username: 'tyler',
        password: 'tyler',
        cash: 500,
    },
    {
        username: 'jim',
        password: 'jim',
    },
    {
        username: 'howard',
        password: 'howard',
        cash: 10000,
    }
]

const seedUsers = () => User.bulkCreate(users, {individualHooks: true});

module.exports = seedUsers;