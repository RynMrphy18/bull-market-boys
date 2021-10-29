const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model{
    getTransactionsByUserId(userId){
        return this.findAll({
            where: {
                user_id : {
                    [Op.eq]: userId
                }
            }
        });
    }
}

Transaction.init(
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

        shares: {
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
            type: DataTypes.INTEGER,
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
        underscored: true,
        modelName: 'transaction'
    }
)

module.exports = Transaction;