const express = require("express");
const {getPost, getAllPost, postPost, deletePost, patchPost} = require("../controller/posts");
const { get } = require("https");

const router = express.Router();

router.get("/admin", getAllPost);
router.get("/:postId", getPost);

router.route('/')
  .post(postPost)
  .delete(deletePost)
  .patch(patchPost);

module.exports = router;