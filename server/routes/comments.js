const express = require("express");
const { 
    getCommentsByPost, getAllComments, postComments, deleteComments, patchComments 
} = require("../controller/comments");

const router = express.Router();

router.get("/admin", getAllComments);
router.get("/:postId", getCommentsByPost);

router.route("/")
    .post(postComments)
    .delete(deleteComments)
    .patch(patchComments);

module.exports = router;