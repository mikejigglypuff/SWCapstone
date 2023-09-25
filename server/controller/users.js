const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const bcrypt = require("bcrypt");
const salt = require("../config/salt.json");
const { errRes } = require("../utility");

exports.getUser = async (req, res, next) => {
  try {
    const t = await DB.sequelize.transaction();

    const user = await DB.Users.findAll({
      attributes: ['username', 'phonenumber', 'regDate'],
      lock: true,
      where: {
        username: req.body.name
      },
    }, { 
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      lock: true,
      transaction: t 
    });
    console.log(user);
    res.status(200).json(JSON.stringify(user));
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //회원 조회

exports.postUser = async (req, res, next) => {
  const t = await DB.sequelize.transaction();

  const userId = await DB.Users.findOne({
    where: {
      username: req.body.name
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(userId) { 
    await t.rollback();
    errRes(res, 400, "user already exists"); 
  }

  try {
    const user = await DB.Users.create({
      phonenumber: req.body.phoneNum,
      password: req.body.pw,
      username: req.body.name,
      regDate: Sequelize.NOW
    }, { transaction: t });

    t.afterCommit(() => {
      console.log(user);
      res.status(302).redirect("/login");
    });

    await t.commit();
  } catch(err) {
    await t.rollback();
    err.status = 400;
    console.error(err);
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  const t = await DB.sequelize.transaction();

  const user = await DB.Users.findOne({
    where: {
      username: req.body.name, 
      password: bcrypt.hash(req.body.pw, salt.salt)
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(!user) { 
    await t.rollback();
    errRes(res, 404, "user not found"); 
  }
    
  try {
    await DB.Users.destroy({
      where: {
        username: req.body.name,
        password: req.body.pw
      }
    }, { transaction: t });

    t.afterCommit(() => {
      res.status(302).redirect("/");
    });

    await t.commit();
  } catch(err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
} //회원 탈퇴

exports.patchUser = async (req, res, next) => {
  const t = await DB.sequelize.transaction();

  const user = await DB.Users.findOne({
    where: {
      username: req.body.name,
      password: bcrypt.hash(req.body.pw, salt.salt)
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(!user) { 
    await t.rollback();
    errRes(res, 404, "user not found"); 
  }

  try {
    await DB.Users.update({
      phonenumber: req.body.phoneNum,
      password: req.body.pw,
      where: {
        username: req.body.name
      }
    }, { 
      lock: true,
      transaction: t 
    });

    t.afterCommit(() => {
      res.sendStatus(200);
    });

    await t.commit();
  } catch(err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
} //회원 정보 수정