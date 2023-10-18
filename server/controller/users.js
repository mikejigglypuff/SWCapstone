const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const salt = require("../config/salt.json");
const { errRes } = require("../utility");

exports.getUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      raw: true,
      nest: true,
      attributes: { exclude: ['password', 'deletedAt'] },
      lock: true,
      where: {
        user_id: req.params.userid
      },
    });
    console.log(user);
    res.status(200).json(JSON.stringify(user));
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
        email: req.body.email
      }
    });
    res.status(200).json(JSON.stringify(userId));
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //이메일로 회원 Id 찾기 

exports.postUser = async (req, res, next) => {
  console.log(req.body);
  const userId = await DB.Users.findOne({
    raw: true,
    attributes: ['user_id'],
    where: {
      user_id: req.body.id
    }
  });

  if(userId) { 
    console.log(userId);
    errRes(res, 400, "user already exists"); 
    return;
  }

  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();
  const t = await DB.sequelize.transaction();

  try {
    await DB.Users.create({
      email: req.body.email,
      password: pw,
      user_id: req.body.id,
      username: req.body.name
    }, { 
      lock: true,
      transaction: t 
    });
    await t.commit();

    res.status(302).redirect("/login");
  } catch(err) {
    await t.rollback();
    err.status = 400;
    console.error(err);
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  const user = await DB.Users.findOne({
    raw: true,
    where: {
      user_id: req.body.id, 
      password: crypto.pbkdf2Sync(
        req.body.pw, salt.salt, 105735, 64, "sha512"
      ).toString()
    }
  });

  if(!user) { 
    errRes(res, 404, "user not found"); 
    return;
  }
    
  try {
    await DB.Users.destroy({
      where: {
        user_id: req.body.id,
        password: req.body.pw
      }
    });
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    next(err);
  }
} //회원 탈퇴

exports.patchUser = async (req, res, next) => {
  const pw = crypto.pbkdf2Sync(
    req.body.pw, salt.salt, 105735, 64, "sha512"
  ).toString();

  const user = await DB.Users.findOne({
    raw: true,
    where: {
      user_id: req.body.id,
      password: pw
    }
  });

  if(!user) { 
    errRes(res, 404, "user not found");
    return; 
  }

  try {
    await DB.Users.update({
      email: req.body.email || user.email,
      password: pw || user.pw,
      where: {
        user_id: req.body.id
      }
    });
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    next(err);
  }
} //회원 정보 수정