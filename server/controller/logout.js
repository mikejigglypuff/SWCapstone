const { errRes } = require("../utility");

exports.Logout = (req, res) => {
  const sessionId = req.cookies['connect.sid'].split(".")[0].split(":")[1];
  req.session.destroy((err) => {
    if(err) {
      errRes(res, 404, "session not found");
    } else {
      req.sessionStore.destroy(sessionId, (err) => {
        if(err) {
          errRes(res, 500, "internal server error");
        } else {
          res.clearCookie("connect.sid", "/");
          res.status(200).send({ logout: true });
        }
      });
    }
  });
};