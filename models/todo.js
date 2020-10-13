'use strict';

module.exports = (sequelize, DataTypes) => {
  var todo = sequelize.define('todo', {
    contents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
    user_id:{
      type: DataTypes.STRING,
      allowNull: false
    }, 
  });

  todo.associate = function(models){
    todo.belongsTo(models.user, {foreignKey: 'user_id'})
  }

  return todo;
};