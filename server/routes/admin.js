const express = require("express");
const router = express.Router();
const { adminAuth } = require("../controller/admin");

router.post("/", adminAuth);

module.exports = router;