//라우팅 기능 구현 모듈

const express = require("express");
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

module.exports = router;