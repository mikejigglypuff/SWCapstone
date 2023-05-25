const express = require("express");
const {getUser, postUser} = require("../controller/users");

const router = express.Router();

router.route('/user')
  .get(getUser)
  .post(postUser);

module.exports = router;