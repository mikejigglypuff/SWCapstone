const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
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
