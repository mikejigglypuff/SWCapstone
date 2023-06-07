const authCheck = require("../authCheck");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.render("main.ejs", { text: "로그인", link: "/login" });
  } else {
    res.render("main.ejs", { text: "로그아웃", link: "/logout" });
  }
};

exports.renderBoard = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.render("board.ejs", { text: "로그인", link: "/login" });
  } else {
    res.render("board.ejs", { text: "로그아웃", link: "/logout" });
  }
};

exports.renderLogin = (req, res) => {
  res.render("login.ejs");
};

exports.renderJoin = (req, res) => {
  res.render("joinMembership.ejs", { src: "/joinMembership/joimMembership.js"});
};

exports.renderFindID = (req, res) => {
  res.render("findID.ejs");
};

exports.renderFindPW = (req, res) => {
  res.render("findPW.ejs");
};

exports.renderReplacePW = (req, res) => {
  res.render("replacePW.ejs");
};

exports.renderShowText = (req, res) => {
  res.render("showText.ejs");
};

exports.renderWriteboard = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.status(403);
    res.render("error", {
      error: "403 Error",
      message: "로그인 후 이용 가능합니다."
    });
  } else {
    res.render("writeboard.ejs");
  }
};

exports.rendersearchFitnessCenter = (req, res) => {
  res.render("searchFitnessCenter.ejs");
};
