const express = require("express");
const { sendEmail, verifyEmail } = require("../controller/email");

const router = express.Router();

router.post("/", sendEmail);
router.post("/verify", verifyEmail);

module.exports = router;