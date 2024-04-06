const express = require("express");

const { getUserIDByEmail } = require("../controller/users");

const router = express.Router();

router.post("/id", getUserIDByEmail);

module.exports = router;