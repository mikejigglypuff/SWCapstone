const crypto = require("crypto");
const path = require("path");
const salt = require("../config/salt.json");
const DB = require("../models/index");
const { errRes } = require("../utility");
const { isAdmin } = require("../authCheck");

exports.getAdminName = async (req, res, next) => {
  if(isAdmin(req, res)) {
    console.log(req.session);
    res.send(req.session.admin_Name);
  } else {
    res.status(401).send("Needs login");
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
        console.log("admin not found");
        errRes(res, 404, "admin not found");
      }
    } catch(err) {
      err.status = 404;
      console.error(err);
      next(err);
    }
}; //관리자 로그인 처리

exports.postAdmin = async (req, res, next) => {
    console.log(req.body);

    if(!req.body.makesAdmin) {
      errRes(res, 400, "bad request"); 
      return;
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
      if(err.name === "SequelizeUniqueConstraintError") { 
        err.status = 400; 
        err.message = "Admin Already Exists";
      }
      else { 
        err.status = 500; 
        err.message = "Internal Server Error"
      }
      console.error(err);
      next(err);
    }
}; //관리자 회원가입 처리


