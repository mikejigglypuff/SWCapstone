const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
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
      allowNull: false
    },
    favcnt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(45),
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
    sequelize,
    timestamps: true,
    tableName: 'posts',
    paranoid: true,
    createdAt: false,
    updatedAt: false
  });
};
