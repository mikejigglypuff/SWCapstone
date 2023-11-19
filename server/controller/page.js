const authCheck = require("../authCheck");
const path = require("path");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../../resources/frontend/build/index.html"));
};

exports.renderAdmin = (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../views/adminPage.html"));
}; //관리자 페이지 제공