'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        static associate(models) {
            Todo.belongsTo(models.User)
        }
    }

    Todo.init({
        title: {
            type: DataTypes.STRING(1234),
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'Todo',
        tableName: 'TODO_MDTB',
    })

    return Todo
}