const express = require("express");
const {getPost, getAllPost, postPost, deletePost, deletePostByAdmin, patchPost} = require("../controller/posts");
const { get } = require("https");

const router = express.Router();

router.route("/admin")
  .get(getAllPost)
  .delete(deletePostByAdmin);
  
router.route("/:postId")
  .get(getPost)
  .delete(deletePost);

router.route('/')
  .post(postPost)
  .patch(patchPost);

module.exports = router;