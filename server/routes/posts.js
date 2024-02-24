const express = require("express");
const {getPost, getAllPost, postPost, deletePost, deletePostByAdmin, patchPost} = require("../controller/posts");
const { upload } = require("../utility");
const { get } = require("https");

const router = express.Router();

router.route("/admin")
  .get(getAllPost)
  .delete(deletePostByAdmin);
  
router.route("/:postId")
  .get(getPost)
  .delete(deletePost);

router.route('/')
  .post(upload.single("image"), postPost)
  .patch(upload.single("image"), patchPost);

module.exports = router;