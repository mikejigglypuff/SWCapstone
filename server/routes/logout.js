const express = require("express");
const router = express.Router();
const { getLogout } = require("../controller/logout");

router.get("/", getLogout);

module.exports = router;