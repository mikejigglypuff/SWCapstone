const express = require("express");
const { getCommentByPost, postComment, deleteComment, patchComment } = require("../controller/comments");

const router = express.Router();

router.route("/")
    .get(getCommentByPost)
    .post(postComment)
    .delete(deleteComment)
    .patch(patchComment);

module.exports = router;