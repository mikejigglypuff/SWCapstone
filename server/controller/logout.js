const { globalSendRes } = require("../utility");
const HttpError = require("../httpError");

exports.Logout = (req, res) => {
  const sessionId = req.cookies['connect.sid'].split(".")[0].split(":")[1];
  req.session.destroy((err) => {
    if(err) {
      throw new HttpError(401, "로그인이 필요합니다");
    } else {
      req.sessionStore.destroy(sessionId, (err) => {
        if(err) {
          throw new HttpError(500, "서버 내부 에러");
        } else {
          res.clearCookie("connect.sid", "/");
          globalSendRes(res, 200, { logout: true });
        }
      });
    }
  });
};