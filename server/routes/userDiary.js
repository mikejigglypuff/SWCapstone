const express = require("express");
const { getDiary, postDiary } = require("../controller/userDiary");

const router = express.Router();

router.route("/")
    .get(getDiary)
    .post(postDiary);

module.exports = router;