const Sequelize = require('sequelize');
const DB = require("../models/index");

exports.getPost = async (req, res, next) => {
  try {
    const post = await DB.Posts.findAll({
      attributes: ['title', 'content', 'userId', 'favcnt', 'createdAt'],
      where: {
        post_id: req.body.id
      },
    });
    console.log(post);
    res.send(post);
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  try {
    const userId = await DB.Users.findOne({
      attributes: ['user_id'],
      where: {
        username: req.body.name
      }
    });

    try {
      const post = await DB.Posts.create({
        title: req.body.title,
        content: req.body.content,
        userId: userId,
        favcnt: 0,
        createdAt: Sequelize.NOW
      });
      console.log(post);
      res.status(302).redirect("/board");
    } catch(err) {
      console.error(err);
      next(err);
    }
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
};