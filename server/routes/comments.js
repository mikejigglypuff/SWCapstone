const express = require("express");
const { 
    getCommentsByPost, getAllComments, postComments, deleteComments, deleteCommentsByAdmin, patchComments 
} = require("../controller/comments");

const router = express.Router();

router.route("/admin")
    .get(getAllComments)
    .delete(deleteCommentsByAdmin);
router.get("/:postId", getCommentsByPost);

router.route("/")
    .post(postComments)
    .delete(deleteComments)
    .patch(patchComments);

module.exports = router;