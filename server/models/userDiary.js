const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userDiary', {
    diary_id: {
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
    weight: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false
    },
    bodyFat: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true
    },
    muscle: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true
    },
    bodyParts: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('date').toISOString().slice(0, 10);
      }
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
    tableName: 'userDiary',
    timestamps: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false 
  });
};
