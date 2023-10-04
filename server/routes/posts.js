const express = require("express");
const {getPost, postPost, deletePost, patchPost} = require("../controller/posts");

const router = express.Router();

router.get("/:postId", getPost);

router.route('/')
  .post(postPost)
  .delete(deletePost)
  .patch(patchPost);

module.exports = router;