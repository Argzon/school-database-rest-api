'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Users extends Model {}
    Users.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First name is required.'
                },
                notEmpty: {
                    msg: 'Please provide the first name.'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last name is required.'
                },
                notEmpty: {
                    msg: 'Please provide the last name.'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'The email you entered already exists.'
            },
            validate: {
                notNull: {
                    msg: 'An email is required.'
                },
                isEmail: {
                    msg: 'Please provide a valid email address.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is required.'
                },
                notEmpty: {
                    msg: 'Please provide a password.'
                }
            }
        }
    }, { sequelize });

    Users.associate = (models) => {
        Users.hasMany(models.Courses);
    }

    return Users;
}