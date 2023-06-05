const DB = require("../models/index");

exports.getUser = async (req, res, next) => {
  try {
    const user = await DB.Users.findAll({
      where: {
        name: req.body.name
      },
    });
    console.log(user);
    res.send(user);
  } catch(err) {
    console.log(err);
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    
    const user = await DB.Users.create({
      phonenumber: req.body.phoneNum,
      password: req.body.pw,
      username: req.body.name,
    });
    console.log(user);
    res.redirect("/login");
  } catch(err) {
    console.log(err);
    next(err);
  }
};