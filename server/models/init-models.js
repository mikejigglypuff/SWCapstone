var DataTypes = require("sequelize").DataTypes;
var _posts = require("./posts");
var _userinfo = require("./userinfo");
var _users = require("./users");

function initModels(sequelize) {
  var posts = _posts(sequelize, DataTypes);
  var userinfo = _userinfo(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    posts,
    userinfo,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
