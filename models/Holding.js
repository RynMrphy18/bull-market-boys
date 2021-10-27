const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Holding extends Model{
    getHoldingsByUserId(userId){
        return this.findAll({
            where: {
                user_id : {
                    [Op.eq]: userId
                }
            }
        });
    }
}

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
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }
)

module.exports = Holding;