const crypto = require("crypto");
const session = require("../config/session.json");
const DB = require("../models/index");
const HttpError = require("../httpError");
const { isAdmin } = require("../authCheck");
const { verifyEmail } = require("./email");

exports.getAdminName = async (req, res, next) => {
  try {
    isAdmin(req, res);

    console.log(req.session);
    res.send(req.session.admin_Name);
  } catch(err) {
    next(err);
  }
}; //로그인 후 관리자 닉네임 반환

exports.adminAuth = async (req, res, next) => {
    try {
      const id = req.body.id;
      if(!id) { throw new HttpError(400, "잘못된 요청입니다"); }

      const inputPW = crypto.pbkdf2Sync(
        req.body.pw, session.salt, session.iterations, session.len, session.hash
      ).toString();

      const admin = await DB.Admins.findOne({
        raw: true,
        where: {
          admin_id: id,
          deletedAt: null,
          banExpiresAt: { [DB.Sequelize.Op.lt] : new Date() }
        }
      });
      
      if(admin.password && inputPW === admin.password) {
        req.session.is_Logined = true;
        req.session.admin_Name = admin.adminname;
        req.session.is_Admin = true;
        req.session.save((err) => {
          if(err) { throw new HttpError(500, "서버 내부 에러"); }
        });
        res.sendStatus(200);
      } else {
        throw new HttpError(404, "관리자 아이디 또는 패스워드가 일치하지 않습니다");
      }
    } catch(err) {
      next(err);
    }
}; //관리자 로그인 처리

exports.postAdmin = async (req, res, next) => {
    try {
      if(!req.body.makesAdmin) { throw new HttpError(400, "잘못된 요청입니다"); }

      const email = verifyEmail(req);

      const pw = crypto.pbkdf2Sync(
        req.body.pw, session.salt, session.iterations, session.len, session.hash
      ).toString();
  
      await DB.Admins.create({
        email: email,
        password: pw,
        admin_id: req.body.id,
        adminname: req.body.name,
        isadmin: true
      });
        
      res.sendStatus(201);  
    } catch(err) {
      next(err);
    }
}; //관리자 회원가입 처리


