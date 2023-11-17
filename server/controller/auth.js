const crypto = require("crypto");
const salt = require("../config/salt.json");
const DB = require("../models/index");
const { errRedirect } = require("../utility");

exports.postAuth = async (req, res, next) => {
    const id = req.body.id;
    const inputPW = crypto.pbkdf2Sync(
      req.body.pw, salt.salt, 105735, 64, "sha512"
    ).toString();

    try {
      const userPW = await DB.Users.findOne({
        raw: true,
        attributes: ["password"],
        where: {
          user_id: id,
          deletedAt: null
        }
      });
      
      if(userPW && inputPW === userPW.password) {
        req.session.is_Logined = true;
        req.session.user_id = id;
        req.session.save((err) => {
          if(err) { return next(err); }
        });
        res.sendStatus(200);
      } else {
        errRedirect(res, 404, "/");
      }
    } catch(err) {
      next(err);
    }
};