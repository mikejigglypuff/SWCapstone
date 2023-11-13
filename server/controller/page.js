const authCheck = require("../authCheck");
const path = require("path");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  if(authCheck.hasSession(req, res)) { console.log(req.session); }
  //로그인 여부를 확인해야 할 경우 hasSession()을 적용할 수 있도록 할 것
  return res.status(200).sendFile(path.resolve(__dirname, "../../resources/frontend/build/index.html"));
};

exports.renderAdmin = (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../views/adminPage.html"));
}; //관리자 페이지 제공