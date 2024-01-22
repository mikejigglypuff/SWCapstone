const DB = require("./models/index");
const HttpError = require("./httpError");

//회원 로그인 여부 체크
exports.hasSession = (req, res) => {
  if (req.session && req.session.is_Logined) { return true; }
  throw new HttpError(401, "로그인이 필요합니다"); 
}

exports.checkSameID = (req, res, id) => {
  this.hasSession(req, res);
  if(req.session.user_id !== id) { throw new HttpError(403, "잘못된 접근입니다"); }
}

//관리자 여부 체크
exports.isAdmin = (req, res) => {
  if(req.session && req.session.is_Admin) { return true; }
  else if(this.hasSession(req, res)) { throw new HttpError(403, "접근 권한이 없습니다");  }
}
