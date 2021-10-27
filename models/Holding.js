const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Holding extends Model{}

Holding.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shares: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

module.exports = Holding;