//라우팅 기능 구현 모듈

const express = require("express");
const { renderMain, renderAdmin } = require("../controller/page");

const router = express.Router();

router.get("/admin", renderAdmin);
router.get("*", renderMain);

module.exports = router;