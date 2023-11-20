const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
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
    timestamps: true.
    tableName: 'users',
    paranoid: true,
    createdAt: false,
    updatedAt: false
  });
};
