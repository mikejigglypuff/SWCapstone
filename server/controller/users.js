const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const salt = require("../config/salt.json");
const { globalSendRes: errRes } = require("../utility");
const { hasSession, isAdmin } = require("../authCheck");
const { Logout } = require("./logout");
const { verifyEmail } = require("./email");

exports.getUser = async (req, res, next) => {
  if(!hasSession(req, res)) {
    errRes(res, 401, "로그인이 필요합니다");
  }

  try {
    const user = await DB.Users.findOne({
      raw: true,
      attributes: { exclude: ['password', 'deletedAt'] },
      lock: true,
      where: {
        user_id: req.session.user_id,
        deletedAt: null
      },
    });
    res.json(user);
  } catch(err) {
    next(err);
  }
}; //회원 조회

exports.getUserIDByEmail = async (req, res, next) => {
  try {
    const userId = await DB.Users.findOne({
      raw: true,
      attributes: ["user_id"],
      where: {
        email: req.params.email,
        deletedAt: null
      }
    });
    res.json(userId);
  } catch(err) {
    next(err);
  }
}; //이메일로 회원 Id 찾기 

exports.getAllUser = async (req, res, next) => {
  if(!isAdmin(req, res)) {
    errRes(res, 401, "로그인이 필요합니다");
  }
  
  try {
    await DB.sequelize.transaction(async (t) => {
      const users = await DB.Users.findAll({
        raw: true,
        nest: true,
        attributes: { exclude: ['password', 'deletedAt'] },
        where: {
          deletedAt: null
        }
      }, { transaction: t });

      res.json(users);
    });

  } catch(err) {
    next(err);
  }
}; //관리자 한정 전체 회원정보 조회

exports.postUser = async (req, res, next) => {
  const email = verifyEmail(req);
  console.log(email);
  if(!email) {
    errRes(res, 400, "이메일 인증 실패");
  }

  try {
    const pw = crypto.pbkdf2Sync(
      req.body.pw, salt.salt, 105735, 64, "sha512"
    ).toString();

    await DB.Users.create({
      email: email,
      password: pw,
      user_id: req.body.id,
      username: req.body.name
    });
      
    res.redirect("/login");  
    
  } catch(err) {
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  if(!hasSession(req, res)) { 
    errRes(res, 401, "로그인이 필요합니다"); 
    return;
  }

  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();
    
  try {
    await DB.Users.destroy({
      where: {
        user_id: req.session.user_id,
        password: pw
      }
    });
    Logout(req, res);
  } catch(err) {
    next(err);
  }
} //회원 탈퇴

exports.patchUser = async (req, res, next) => {
  if(!hasSession(req, res)) { 
    errRes(res, 401, "로그인이 필요합니다"); 
    return;
  }

  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();

  try {
    const newPW = (req.body.newPW) ? crypto.pbkdf2Sync(
      req.body.newPW, salt.salt, 105735, 64, "sha512"
    ).toString() : null;

    await DB.Users.update({
      email: req.body.email || user.email,
      password: newPW || pw
    }, {
      where: {
        user_id: req.session.user_id
      }
    });
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
} //회원 정보 수정