const express = require("express");
const { getCommentsByPost, postComments, deleteComments, patchComments } = require("../controller/comments");

const router = express.Router();

router.route("/")
    .get(getCommentsByPost)
    .post(postComments)
    .delete(deleteComments)
    .patch(patchComments);

module.exports = router;