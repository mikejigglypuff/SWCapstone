const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
    session_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cookie: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isLogined: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'sessions'
  });
};
