const Sequelize = require('sequelize');
const DB = require("../models/index");

exports.getUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      attributes: ['username', 'phonenumber', 'regDate'],
      where: {
        username: req.body.name
      },
    });
    console.log(user);
    res.status(200).send(user);
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //회원 조회

exports.postUser = async (req, res, next) => {
  try {
    const user = await DB.Users.create({
      phonenumber: req.body.phoneNum,
      password: req.body.pw,
      username: req.body.name,
      regDate: Sequelize.NOW
    });
    console.log(user);
    res.status(302).redirect("/login");
  } catch(err) {
    err.status = 400;
    console.error(err);
    next(err);
  }
}; //회원가입

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      where: {
        username: req.body.name
      }
    });
    
    try {
      await DB.Users.destroy({
        where: {
          username: req.body.name,
          password: req.body.pw
        }
      });
      res.status(302).redirect("/");
    } catch(err) {
      console.error(err);
      next(err);
    }
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
} //회원 탈퇴

exports.patchUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      where: {
        username: req.body.name
      }
    });

    try {
      await DB.Users.update({
        phonenumber: req.body.phoneNum,
        password: req.body.pw,
        where: {
          username: req.body.name
        }
      });
      res.sendStatus(200);
    } catch(err) {
      console.error(err);
      next(err);
    }
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
} //회원 정보 수정