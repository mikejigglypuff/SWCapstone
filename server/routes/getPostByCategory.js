const express = require("express");
const {getPostByCategory} = require("../controller/posts");

const router = express.Router();

router.get("/:category", getPostByCategory);

module.exports = router;