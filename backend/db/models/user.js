'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {}
    }

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resettoken: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'USER_MDTB',
    })

    return User
}