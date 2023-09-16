const authCheck = require("../authCheck");
//api 콜백함수 구현 모듈

exports.renderMain = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.status(200).render("main.ejs", { text: "로그인", link: "/login" });
  } else {
    res.status(200).render("main.ejs", { text: "로그아웃", link: "/logout" });
  }
};

exports.renderBoard = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.status(200).render("board.ejs", { text: "로그인", link: "/login" });
  } else {
    res.status(200).render("board.ejs", { text: "로그아웃", link: "/logout" });
  }
};

exports.renderLogin = (req, res) => {
  res.status(200).render("login.ejs");
};

exports.renderJoin = (req, res) => {
  res.status(200).render("joinMembership.ejs", { src: "/joinMembership/joimMembership.js"});
};

exports.renderFindID = (req, res) => {
  res.status(200).render("findID.ejs");
};

exports.renderFindPW = (req, res) => {
  res.status(200).render("findPW.ejs");
};

exports.renderReplacePW = (req, res) => {
  res.status(200).render("replacePW.ejs");
};

exports.renderShowText = (req, res) => {
  res.status(200).render("showText.ejs");
};

exports.renderWriteboard = (req, res) => {
  if(!authCheck.hasSession(req, res)) {
    res.status = 403;
    res.render("error", {
      error: "403 Error",
      message: "로그인 후 이용 가능합니다."
    });
  } else {
    res.status(200).render("writeboard.ejs");
  }
};

exports.rendersearchFitnessCenter = (req, res) => {
  res.status(200).render("searchFitnessCenter.ejs");
};
