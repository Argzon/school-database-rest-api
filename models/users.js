'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Users extends Model {
        
        static associate({Courses}) {
            this.hasMany(Courses, {
                foreignKey: {
                    type: DataTypes.INTEGER,
                    name: 'userId',
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: 'userId is a required field.',
                        },
                        notEmpty: {
                            msg: 'userId can not be empty.',
                        }
                    }
                },
                as: 'courses',
            });
        }
    }
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
    }, { 
        sequelize,
        modelName: 'Users',
        });

    Users.afterValidate((user) => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
    });

    return Users;
}