//라우팅 기능 구현 모듈

const express = require("express");
var User = require('../models/users');
const { renderMain, renderBoard, renderLogin, renderFindID, 
  renderJoin, renderFindPW, renderReplacePW} = require("../controller/page");

const router = express.Router();

router.get("/", renderMain);
router.get("/board", renderBoard);
router.get("/login", renderLogin);
router.get("/join", renderJoin);
router.get("/findID", renderFindID);
router.get("/findPW", renderFindPW);
router.get("/replacePW", renderReplacePW);
router.get("/users", (req, res) => {
  User.find({where:{id:1}})
      .then((user) => {
    res.render('index', {
      title: 'Express',
      useremail: "1234@mail.com"});
  });
});

module.exports = router;