'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Courses extends Model {}
    Courses.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title is required.'
                },
                notEmpty: {
                    msg: 'Please provide a title.'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Description is required.'
                },
                notEmpty: {
                    msg: 'Please provide a description.'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
        },
    }, { 
        sequelize,
        timestamps: false,
     });

     Courses.associate = (models) => {
        Courses.belongsTo(models.Users, {
          foreignKey: {
            fieldName: 'userId',
            allowNull: false,
          },
        });
      };

    return Courses;
};