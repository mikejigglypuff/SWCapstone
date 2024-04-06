const crypto = require("crypto");
const session = require("../config/session.json");
const DB = require("../models/index");
const HttpError = require("../httpError");

exports.postAuth = async (req, res, next) => {
    try {
      const id = req.body.id;
      if(!id) { throw new HttpError(400, "잘못된 요청입니다"); }

      const inputPW = crypto.pbkdf2Sync(
        req.body.pw, session.salt, session.iterations, session.len, session.hash
      ).toString();

      const userPW = await DB.Users.findOne({
        raw: true,
        attributes: ["password"],
        where: {
          user_id: id,
          deletedAt: null,
          banExpiresAt: { [DB.Sequelize.Op.lt] : new Date() }
        }
      });
      
      if(userPW && inputPW === userPW.password) {
        req.session.is_Logined = true;
        req.session.user_id = id;
        req.session.save((err) => {
          if(err) { throw new HttpError(500, "서버 내부 에러"); }
        });
        res.status(201).json({ user_id: id });
      } else {
        throw new HttpError(404, "회원 아이디 또는 패스워드가 일치하지 않습니다");
      }
    } catch(err) {
      next(err);
    }
};