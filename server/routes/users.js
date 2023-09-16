const express = require("express");
const {getUser, postUser, deleteUser, patchUser} = require("../controller/users");

const router = express.Router();

router.route('/')
  .get(getUser)
  .post(postUser)
  .delete(deleteUser)
  .patch(patchUser);

module.exports = router;