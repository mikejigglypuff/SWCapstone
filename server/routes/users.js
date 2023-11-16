const express = require("express");
const { getUser, getAllUser, postUser, deleteUser, patchUser } = require("../controller/users");
const { getPostsByUser } = require("../controller/posts");
const { getCommentsByUser } = require("../controller/comments");

const router = express.Router();

router.get("/admin", getAllUser);
router.get("/post", getPostsByUser);
router.get("/comment", getCommentsByUser);

router.route('/')
  .get(getUser)
  .post(postUser)
  .delete(deleteUser)
  .patch(patchUser);

module.exports = router;