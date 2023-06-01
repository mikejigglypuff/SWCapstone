const User = require("../models/users");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        name: req.body.name
      },
    });
    console.log(user);
    res.redirect("/login");
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
    res.redirect("/login");
  } catch(err) {
    console.log(err);
    next(err);
  }
};