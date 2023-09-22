const Sequelize = require('sequelize');
const DB = require("../models/index");
const { errRes } = require("../utility");

exports.getPost = async (req, res, next) => {
  try {
    const post = await DB.Posts.findAll({
      where: {
        post_id: req.body.id
      },
    });
    console.log(post);
    res.json(JSON.stringify(post));
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //특정 id의 게시글 조회

exports.getPostByCategory = async (req, res, next) => {
  try {
    const post = await DB.Posts.findAll({
      where: {
        category: req.params.category
      },
    });
    console.log(post);
    res.render("board", JSON.stringify(post));
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //게시판 별 게시글 조회

exports.postPost = async (req, res, next) => {
  const userId = await DB.Users.findOne({
    attributes: ['user_id'],
    where: {
      username: req.body.name
    }
  });

  if(!userId) { errRes(res, 404, "user not found"); }

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
}; //게시글 등록

exports.deletePost = async (req, res, next) => {
  const post = await DB.Posts.findOne({
    where: {
      post_id: req.body.id
    }
  });

  if(post) { errRes(res, 404, "page not found"); }

  try {
    await DB.Posts.destroy({
      where: {
        post_id: req.body.id
      }
    });
    res.status(302).redirect("/");
  } catch(err) {
    console.error(err);
    next(err);
  }
}; //게시글 삭제

exports.patchPost = async (req, res, next) => {
  const post = await DB.Posts.findOne({
    where: {
      post_id: req.body.id
    }
  });

  if(post.length) { errRes(res, 404, "page not found"); }

  try {
    await DB.Posts.update({
      title: req.body.title,
      content: req.body.content,
      favcnt: req.body.favcnt,
      category: req.body.category,
      where: {
        post_id: req.body.id
      }
    });
  } catch(err) {
    console.error(err);
    next(err);
  }
}; //게시글 수정