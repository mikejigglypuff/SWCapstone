//라우팅 기능 구현 모듈

const express = require("express");
const { renderMain } = require("../controller/page");

const router = express.Router();

router.get("*", renderMain);

module.exports = router;