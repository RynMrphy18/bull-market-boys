import User from './User';
import Holding from './Holding';
import Transaction from './Transaction';

User.hasMany(Holding);
Holding.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {User, Holding, Transaction};