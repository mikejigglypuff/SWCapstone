const express = require("express");
const User = require("../models/users");
const Userinfo = require("../models/userinfo");
const {getUser, postUser} = require("../controller/users");

const router = express.Router();

router.route('/user')
  .get(getUser)
  .post(postUser);

module.exports = router;