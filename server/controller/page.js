const authCheck = require("../authCheck");
const path = require("path");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  //로그인 여부를 확인해야 할 경우 hasSession()을 적용할 수 있도록 할 것
  return res.status(200).sendFile(path.resolve(__dirname, "../../resources/frontend/build/index.html"));
};