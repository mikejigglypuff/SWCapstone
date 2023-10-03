const crypto = require("crypto");
const bcrypt = require("bcrypt");
const salt = require("../config/salt.json");
const DB = require("../models/index");
const { errRedirect } = require("../utility");

exports.postAuth = async (req, res, next) => {
    const id = req.body.id;
    const inputPW = (await bcrypt.hash(req.body.pw, salt.salt)).toString();

    try {
      const userPW = await DB.Users.findOne({
        raw: true,
        attributes: ["password"],
        where: {
          username: id
        }
      });
      console.log(userPW);
      
      if(userPW && bcrypt.compare(inputPW, userPW.password)) {
        const rand = crypto.randomUUID();
        req.session.is_Logined = true;
        req.session.name = rand;
        req.session.userName = id;
        req.session.save((err) => {
          if(err) { return next(err); }
          res.redirect("/");
        });
      } else {
        console.log("user not found");
        errRedirect(res, 404, "/");
      }
    } catch(err) {
      err.status = 404;
      console.error(err);
      next(err);
    }
};