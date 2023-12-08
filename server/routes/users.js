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
router.patch("/deleteUser", deleteUser);

router.route('/')
  .get(getUser)
  .post(postUser)
  .patch(patchUser);

module.exports = router;