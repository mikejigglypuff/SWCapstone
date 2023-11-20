const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    admin_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    adminname: {
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
    isadmin: {
      type: DataTypes.BOOLEAN,
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
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const deletedAt = this.getDataValue('deletedAt');
        return deletedAt ? deletedAt.toISOString().slice(0, 10) : null;
      }
    }
  }, {
    sequelize,
    tableName: 'admins',
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false
  });
};
