const express = require("express");

const { verifyUserByEmailID, replacePW } = require("../controller/replacePW");

const router = express.Router();

router.route("/")
    .get(verifyUserByEmailID)
    .patch(replacePW);

module.exports = router;