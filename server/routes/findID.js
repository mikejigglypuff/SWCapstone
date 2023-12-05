const express = require("express");

const { getUserIDByEmail } = require("../controller/users");

const router = express.Router();

router.post("/", getUserIDByEmail);

module.exports = router;