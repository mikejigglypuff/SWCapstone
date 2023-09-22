const express = require("express");
const {getPost, getPostByCategory, postPost, deletePost, patchPost} = require("../controller/posts");

const router = express.Router();

router.route('/')
  .get(getPost)
  .post(postPost)
  .delete(deletePost)
  .patch(patchPost);

router.route('/:category')
  .get(getPostByCategory);

module.exports = router;