const Sequelize = require('sequelize');
const DB = require("../models/index");

exports.getPost = async (req, res, next) => {
  try {
    const op = Sequelize.Op;
    const post = await DB.Posts.findAll({
      where: {
        id: { [op.in]: req.body.id }
      },
    });
    console.log(post);
    res.send(post);
  } catch(err) {
    err.status = 400;
    console.log(err);
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  try {
    const post = await DB.Posts.create({
      title: req.body.title,
      content: req.body.content,
      nickname: req.session.userName,
      favcnt: 0
    });
    console.log(post);
    res.redirect("/board");
  } catch(err) {
    err.status = 400;
    console.log(err);
    next(err);
  }
};