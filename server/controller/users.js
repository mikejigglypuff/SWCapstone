const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const session = require("../config/session.json");
const { isAdmin, hasSession } = require("../authCheck");
const { Logout } = require("./logout");
const { verifyEmail } = require("./email");

exports.getUser = async (req, res, next) => {
  try {
    hasSession(req, res);

    const user = await DB.Users.findOne({
      raw: true,
      attributes: { exclude: ['password', 'deletedAt'] },
      lock: true,
      where: {
        user_id: req.session.user_id,
        deletedAt: null,
      },
    });

    res.json(user);
  } catch(err) {
    next(err);
  }
}; //회원 조회

exports.getUserIDByEmail = async (req, res, next) => {
  try {
    const email = verifyEmail(req);

    const userId = await DB.Users.findOne({
      raw: true,
      attributes: ["user_id"],
      where: {
        username: req.body.name,
        email: email,
        deletedAt: null
      }
    });

    res.json(userId);
  } catch(err) {
    next(err);
  }
}; //이메일로 회원 Id 찾기 

exports.getAllUser = async (req, res, next) => {  
  try {
    isAdmin(req, res);

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

exports.getUserIdOverlaps = async (req, res, next) => {
  try {
    let overlap = false;

    await DB.sequelize.transaction(async t => {
      const userId = await DB.Users.findOne({
        raw: true,
        attributes: ["user_id"],
        where: {
          user_id: req.params.userId
        }
      });

      if(userId) { overlap = true; }
      res.json({ isOverlap: overlap });

    });
  } catch(err) {
    next(err);
  }
}; //id 중복 검사

exports.postUser = async (req, res, next) => {
  try {
    const email = verifyEmail(req);

    const pw = crypto.pbkdf2Sync(
      req.body.pw, session.salt, session.iterations, session.len, session.hash
    ).toString();

    await DB.Users.create({
      email: email,
      password: pw,
      user_id: req.body.id,
      username: req.body.name
    });
      
    res.sendStatus(200);  
    
  } catch(err) {
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  try {
    hasSession(req, res);

    const pw = crypto.pbkdf2Sync(
      req.body.pw, session.salt, session.iterations, session.len, session.hash
    ).toString();

    await DB.Users.destroy({
      where: {
        user_id: req.session.user_id,
        password: pw,
        deletedAt: null,
      }
    });

    Logout(req, res);
  } catch(err) {
    next(err);
  }
}; //회원 탈퇴

exports.deleteUserByAdmin = async (req, res, next) => {
  try {
    isAdmin(req, res);

    await DB.Users.update({
      banExpiresAt: new Date().setDate(new Date().getDate() + req.body.banDays)
    }, {
      where: {
        user_id: req.body.user_id,
        deletedAt: null
      }
    });
    await DB.sequelize.query(`DELETE from sessions where data like '%${req.body.user_id}%'`);

    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
}; //운영자가 직접 회원 탈퇴 처리

exports.patchUser = async (req, res, next) => {
  try {
    hasSession(req, res);

    const pw = crypto.pbkdf2Sync(
      req.body.pw, session.salt, session.iterations, session.len, session.hash
    ).toString();

    const newPW = (req.body.newPW) ? crypto.pbkdf2Sync(
      req.body.newPW, session.salt, session.iterations, session.len, session.hash
    ).toString() : null;

    const email = req.body.email || await DB.Users.findOne({
      attributes: ["email"],
      where: {
        user_id: req.session.user_id
      }
    }).email;

    await DB.Users.update({
      email: email,
      password: newPW || pw,
      updatedAt: Sequelize.fn('now')
    }, {
      where: {
        user_id: req.session.user_id,
      }
    });
    
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
} //회원 비밀번호 등 정보 수정