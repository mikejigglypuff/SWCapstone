const express = require("express");
const router = express.Router();
const { postAuth } = require("../controller/auth");

router.post("/auth", postAuth);

module.exports = router;