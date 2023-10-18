const express = require("express");

const { getUserIDByEmail } = require("../controller/users");

const router = express.Router();

router.get("/:email", getUserIDByEmail);

module.exports = router;