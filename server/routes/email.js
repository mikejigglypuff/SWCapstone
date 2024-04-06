const express = require("express");
const { sendEmail } = require("../controller/email");

const router = express.Router();

router.post("/auth", sendEmail);

module.exports = router;