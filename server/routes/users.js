const express = require("express");
const { 
  getUser, getAllUser, getUserIdOverlaps, postUser, deleteUser, deleteUserByAdmin, patchUser 
} = require("../controller/users");
const { getPostsByUser } = require("../controller/posts");
const { getCommentsByUser } = require("../controller/comments");

const router = express.Router();

router.route("/admin")
  .get(getAllUser)
  .delete(deleteUserByAdmin);
router.get("/post", getPostsByUser);
router.get("/comment", getCommentsByUser);
router.get("/:userId", getUserIdOverlaps);

router.route('/')
  .get(getUser)
  .post(postUser)
  .delete(deleteUser)
  .patch(patchUser);

module.exports = router;