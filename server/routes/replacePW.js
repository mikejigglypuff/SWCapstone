const express = require("express");

const { getUserByEmailID, replacePW } = require("../controller/replacePW");

const router = express.Router();

router.route("/")
    .get(getUserByEmailID)
    .patch(replacePW);

module.exports = router;