const express = require("express");
const { sendEmail } = require("../controller/email");

const router = express.Router();

router.post("/", sendEmail);

module.exports = router;