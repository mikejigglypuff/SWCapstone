const express = require("express");
const { 
    getCommentsByPost, getAllComments, postComments, deleteComments, deleteCommentsByAdmin, patchComments 
} = require("../controller/comments");

const router = express.Router();

router.route("/admin")
    .get(getAllComments)
    .delete(deleteCommentsByAdmin);

router.route("/:commentId")
    .get(getCommentsByPost)
    .delete(deleteComments);

router.route("/")
    .post(postComments)
    .patch(patchComments);

module.exports = router;