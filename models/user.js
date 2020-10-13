'use strict';

module.exports = (sequelize, DataTypes) => {
  var user=sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    user_pw: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  },);

  user.associate=function(models){
    user.hasMany(models.todo)
  }
  
  return user;
};