const express = require("express");
const {getPost, postPost} = require("../controller/posts");

const router = express.Router();

router.route('/')
  .get(getPost)
  .post(postPost);

module.exports = router;