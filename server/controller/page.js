//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  res.render("main");
};

exports.renderBoard = (req, res) => {
  res.render("board", { type: 'free'});
};

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.renderJoin = (req, res) => {
  res.render("joinMembership");
};

exports.renderFindID = (req, res) => {
  res.render("findID");
};

exports.renderFindPW = (req, res) => {
  res.render("findPW");
};

exports.renderReplacePW = (req, res) => {
  res.render("replacePW");
};