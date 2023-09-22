const express = require("express");
const {getPost, postPost, deletePost, patchPost} = require("../controller/posts");

const router = express.Router();

router.route('/')
  .get(getPost)
  .post(postPost)
  .delete(deletePost)
  .patch(patchPost);

module.exports = router;