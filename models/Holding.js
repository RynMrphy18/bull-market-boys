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

        // transaction_id: {
        //     type: DataTypes.UUID,
        //     references: {
        //         model: 'transaction',
        //         key: 'id'
        //     }
        // },

        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'holding'
    }
)

module.exports = Holding;