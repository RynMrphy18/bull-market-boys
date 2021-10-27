const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transactions extends Model{}

Transactions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['buy', 'sell']],
            }
        },

        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'transactions'
    }
);