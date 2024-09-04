'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Recipe)
    }
  }
  User.init({
    name:{
      type : DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : {
          msg : "name is required"
        },
        notEmpty: {
          msg : "name is required"
        }
      }
    } ,
    email:{
      type : DataTypes.STRING,
      allowNull : false,
      unique: {
        agrs : true,
        msg : "email already used"
      },
      validate :{
        notNull : {
          msg : "email is required"
        },
        notEmpty: {
          msg : "email is required"
        },

        isEmail :{
          agrs : true,
          msg : "invalid email format"
        }
      }
        
    } ,

    password:{
      type : DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : {
          msg : "password is required"
        },
        notEmpty: {
          msg : "password is required"
        },
        len :{
          len: [5,225],
          msg : "password must be at least 5 Charactar"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashingPassword(user.password)
  })

  return User;
};