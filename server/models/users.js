const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_Num: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    reg_Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "phonenumber_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phonenumber" },
        ]
      },
    ]
  });
};
