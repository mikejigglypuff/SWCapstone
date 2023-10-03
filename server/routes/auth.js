const express = require("express");
const router = express.Router();
const { postAuth } = require("../controller/auth");

router.post("/", postAuth);

module.exports = router;