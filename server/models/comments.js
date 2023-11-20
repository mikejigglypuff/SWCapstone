const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('createdAt').toISOString().slice(0, 10);
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('updatedAt').toISOString().slice(0, 10);
      }
    }
  }, {
    tableName: 'comments',
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false
  });
};
