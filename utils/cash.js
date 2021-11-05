const {User, Holding, Transaction} = require('../models');

function updateUserCash(value, userId){
    User.increment({
        cash: value
    },
    {
        where: {
            id: userId,
        }
    });
    console.log(`User cash changed by: ${value}`);
}

async function getUserCash(userId){
    const user = await User.findOne({where: {id: userId}});
    return user.get("cash");
}

module.exports = {updateUserCash, getUserCash};