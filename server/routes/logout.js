const express = require("express");
const router = express.Router();
const { Logout } = require("../controller/logout");

router.delete("/", Logout);

module.exports = router;