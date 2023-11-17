const crypto = require("crypto");
const salt = require("../config/salt.json");
const DB = require("../models/index");
const { globalSendRes: errRes} = require("../utility");
const { isAdmin, hasSession } = require("../authCheck");

exports.getAdminName = async (req, res, next) => {
  if(isAdmin(req, res)) {
    console.log(req.session);
    res.send(req.session.admin_Name);
  } else if(hasSession(req, res)) {
    res.status(403).send("접근 권한이 없습니다");
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
}; //로그인 후 관리자 닉네임 반환

exports.adminAuth = async (req, res, next) => {
    const id = req.body.id;
    const inputPW = crypto.pbkdf2Sync(
      req.body.pw, salt.salt, 105735, 64, "sha512"
    ).toString();

    try {
      const admin = await DB.Admins.findOne({
        raw: true,
        where: {
          admin_id: id,
          deletedAt: null
        }
      });
      
      if(admin.password && inputPW === admin.password) {
        req.session.is_Logined = true;
        req.session.admin_Name = admin.adminname;
        req.session.is_Admin = true;
        req.session.save((err) => {
          if(err) { return next(err); }
        });
        res.sendStatus(200);
      } else {
        errRes(res, 404, "일치하는 관리자가 없습니다");
      }
    } catch(err) {
      next(err);
    }
}; //관리자 로그인 처리

exports.postAdmin = async (req, res, next) => {
    console.log(req.body);

    if(!req.body.makesAdmin) {
      errRes(res, 400, "잘못된 요청입니다"); 
    }
  
    try {
      const pw = crypto.pbkdf2Sync(
        req.body.pw, salt.salt, 105735, 64, "sha512"
      ).toString();
  
      await DB.Admins.create({
        email: req.body.email,
        password: pw,
        admin_id: req.body.id,
        adminname: req.body.name,
        isadmin: true
      });
        
      res.sendStatus(200);  
    } catch(err) {
      next(err);
    }
}; //관리자 회원가입 처리


