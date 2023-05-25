const User = require("../models/users");
const { Op } = require("sequelize");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        name: req.body.name
      },
    });
    res.json(user);
  } catch(err) {
    console.log(err);
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const user = await User.create({
      phonenumber: req.body.phonenumber,
      password: req.body.password,
    });
    console.log(user);
    res.render("login");
  } catch(err) {
    console.log(err);
    next(err);
  }
};