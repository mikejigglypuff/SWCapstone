const express = require("express");
const {getUser, postUser, deleteUser, patchUser} = require("../controller/users");

const router = express.Router();

router.get("/:userid", getUser);

router.route('/')
  .post(postUser)
  .delete(deleteUser)
  .patch(patchUser);

module.exports = router;