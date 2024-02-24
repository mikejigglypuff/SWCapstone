const express = require("express");
const router = express.Router();
const { getImg } = require("../controller/img");

router.get("/:imgURL", getImg);

module.exports = router;