const express = require("express");
const {getPost, getAllPost, postPost, deletePost, deletePostByAdmin, patchPost} = require("../controller/posts");
const { upload } = require("../utility");
const { get } = require("https");
const { validateXSS } = require("../authCheck");

const router = express.Router();

router.route("/admin")
  .get(getAllPost)
  .delete(deletePostByAdmin);
  
router.route("/:postId")
  .get(getPost)
  .delete(deletePost);

router.route('/')
  .post(upload.single("image"), validateXSS, postPost)
  .patch(upload.single("image"), validateXSS, patchPost);


//router.post("/", upload.single("image"), postPost);
//router.post("/", upload.single("image"), patchPost);

module.exports = router;