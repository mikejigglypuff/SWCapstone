const crypto = require("crypto");
const bcrypt = require("bcrypt");
const salt = require("../config/salt.json");
const DB = require("../models/index");

exports.getAuth = async (req, res) => {
    const id = req.body.id;
    const pw = bcrypt.hash(req.body.pw, salt.salt);
    console.log(req.body);
  
    try {
      const user = await DB.Users.findOne({
        where: {
          username: id,
          password: pw
        }
      });
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
};