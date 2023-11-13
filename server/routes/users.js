const express = require("express");
const {getUser, getAllUser, postUser, deleteUser, patchUser} = require("../controller/users");

const router = express.Router();

router.get("/admin", getAllUser);

router.route('/')
  .get(getUser)
  .post(postUser)
  .delete(deleteUser)
  .patch(patchUser);

module.exports = router;