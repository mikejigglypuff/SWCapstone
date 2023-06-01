const authCheck = require("../authCheck");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.render("main", {logined: false});
  } else {
    res.render("main", {logined: true});
  }
};

exports.renderBoard = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.render("board", {logined: false});
  } else {
    res.render("board", {logined: true});
  }
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

exports.renderWriteboard = (req, res) => {
  res.render("writeboard");
};