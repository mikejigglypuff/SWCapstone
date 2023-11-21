const { Op } = require("sequelize");
const DB = require("./models/index");

//회원 로그인 여부 체크
exports.hasSession = (req, res) => {
  return (req.session && req.session.is_Logined);
}

//관리자 여부 체크
exports.isAdmin = (req, res) => {
  if(req.session && req.session.is_Admin) { return "admin"; }
  else if(this.hasSession(req, res)) { return "user"; }
  return "";
}

