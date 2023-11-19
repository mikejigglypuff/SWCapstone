const express = require("express");
const {getPost, getAllPost, postPost, deletePost, deletePostByAdmin, patchPost} = require("../controller/posts");
const { get } = require("https");

const router = express.Router();

router.route("/admin")
  .get(getAllPost)
  .delete(deletePostByAdmin);
router.get("/:postId", getPost);

router.route('/')
  .post(postPost)
  .delete(deletePost)
  .patch(patchPost);

module.exports = router;