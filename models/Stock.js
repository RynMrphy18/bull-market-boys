const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stock extends Model {}

Stock.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    open: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    close: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    high: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    low: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    yeahHigh: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    yearLow: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stock'
})

module.exports = Stock;