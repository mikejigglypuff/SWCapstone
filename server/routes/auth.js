const express = require("express");
const crypto = require("crypto");
const DB = require("../models/index");
const router = express.Router();

router.post("/", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  console.log(req.body);

  try {
    const user = await DB.Users.findOne({where: {username: id}});
    console.log(user);
      
    const rand = crypto.randomUUID();
    req.session.is_Logined = true;
    req.session.name = rand;
    req.session.userName = user.username;
    req.session.save((err) => {
      if(err) { return next(err); }
      res.redirect("/");
    });
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
});

module.exports = router;