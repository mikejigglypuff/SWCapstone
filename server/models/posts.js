const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    favcnt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: true,
    paranoid: true
  });
};
