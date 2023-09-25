const express = require("express");
const router = express.Router();
const { getAuth } = require("../controller/auth");

router.post("/", getAuth);

module.exports = router;