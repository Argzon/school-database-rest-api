'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Model {}
    Users.init({
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    }, { sequelize });

    Users.associate = (models) => {
        Users.hasMany(models.Courses);
    }

    return Users;
}