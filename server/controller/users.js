const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const salt = require("../config/salt.json");
const { errRes } = require("../utility");
const { hasSession } = require("../authCheck");
const { Logout } = require("./logout");

exports.getUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      raw: true,
      nest: true,
      attributes: { exclude: ['password', 'deletedAt'] },
      lock: true,
      where: {
        user_id: req.session.user_id,
        deletedAt: null
      },
    });
    console.log(user);
    res.status(200).json(user);
  } catch(err) {
    err.status = 404;
    console.error(err);
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
    res.status(200).json(userId);
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //이메일로 회원 Id 찾기 

exports.postUser = async (req, res, next) => {
  const user = await DB.Users.findOne({
    raw: true,
    where: {
      user_id: req.body.id
    }
  });
  console.log(user);

  if(user) { 
    errRes(res, 400, "user already exists"); 
    return;
  }

  try {
    const pw = crypto.pbkdf2Sync(
      req.body.pw, salt.salt, 105735, 64, "sha512"
    ).toString();

    await DB.Users.create({
      email: req.body.email,
      password: pw,
      user_id: req.body.id,
      username: req.body.name
    });
      
    res.status(302).redirect("/login");  
    
  } catch(err) {
    if(err.name === "SequelizeUniqueConstraintError") { 
      err.status = 400; 
      err.message = "User Already Exists";
    }
    else { 
      err.status = 500; 
      err.message = "Internal Server Error"
    }
    console.error(err);
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  if(!hasSession(req, res)) { 
    errRes(res, 401, "unauthorized"); 
    return;
  }

  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();
  
  const user = await DB.Users.findOne({
    raw: true,
    where: {
      user_id: req.session.user_id, 
      password: pw,
      deletedAt: null
    }
  });

  if(!user) { 
    errRes(res, 404, "user not found"); 
    return;
  }
    
  try {
    await DB.Users.destroy({
      where: {
        user_id: req.session.user_id,
        password: pw
      }
    });
    Logout(req, res);
  } catch(err) {
    console.error(err);
    next(err);
  }
} //회원 탈퇴

exports.patchUser = async (req, res, next) => {
  if(!hasSession(req, res)) { 
    errRes(res, 401, "unauthorized"); 
    return;
  }

  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();

  try {
    const user = await DB.Users.findOne({
      raw: true,
      where: {
        user_id: req.session.user_id,
        password: pw,
        deletedAt: null
      }
    });
  
    if(!user) { 
      errRes(res, 404, "user not found");
      return; 
    }

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
    console.error(err);
    next(err);
  }
} //회원 정보 수정