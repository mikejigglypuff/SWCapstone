//라우팅 기능 구현 모듈

const express = require("express");
const { renderMain, renderBoard, renderLogin, renderFindID, 
  renderJoin, renderFindPW, renderReplacePW, renderShowText,
  renderWriteboard, rendersearchFitnessCenter} = require("../controller/page");

const router = express.Router();

router.get("/", renderMain);
router.get("/board", renderBoard);
router.get("/board/:category", getPostByCategory);
router.get("/login", renderLogin);
router.get("/join", renderJoin);
router.get("/findID", renderFindID);
router.get("/findPW", renderFindPW);
router.get("/replacePW", renderReplacePW);
router.get("/showText", renderShowText);
router.get("/writeboard", renderWriteboard);
router.get("/searchFitnessCenter", rendersearchFitnessCenter);

module.exports = router;