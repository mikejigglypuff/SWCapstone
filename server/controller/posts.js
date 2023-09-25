const Sequelize = require('sequelize');
const DB = require("../models/index");
const { errRes } = require("../utility");

exports.getPost = async (req, res, next) => {
  const t = DB.sequelize.transaction();

  try {
    const post = await DB.Posts.findAll({
      where: {
        post_id: req.body.id
      },
    }, {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      lock: true, 
      transaction: t
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
  const t = DB.sequelize.transaction();
  
  try {
    const post = await DB.Posts.findAll({
      where: {
        category: req.params.category
      },
    }, {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      lock: true, 
      transaction: t
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
  const t = DB.sequelize.transaction();

  const userId = await DB.Users.findOne({
    attributes: ['user_id'],
    where: {
      username: req.body.name
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(!userId) { 
    await t.rollback();
    errRes(res, 404, "user not found"); 
  }

  try {
    const post = await DB.Posts.create({
      title: req.body.title,
      content: req.body.content,
      userId: userId,
      favcnt: 0,
      createdAt: Sequelize.NOW
    }, { transaction: t });

    t.afterCommit(() => {
      console.log(post);
      res.status(302).redirect("/board");
    });
    
    await t.commit();
  } catch(err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
}; //게시글 등록

exports.deletePost = async (req, res, next) => {
  const t = DB.sequelize.transaction();

  const post = await DB.Posts.findOne({
    where: {
      post_id: req.body.id
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(post) { 
    await t.rollback();
    errRes(res, 404, "page not found"); 
  }

  try {
    await DB.Posts.destroy({
      where: {
        post_id: req.body.id
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
}; //게시글 삭제

exports.patchPost = async (req, res, next) => {
  const t = DB.sequelize.transaction();

  const post = await DB.Posts.findOne({
    where: {
      post_id: req.body.id
    }
  }, { 
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    lock: true,
    transaction: t 
  });

  if(post.length) { 
    await t.rollback();
    errRes(res, 404, "page not found"); 
  }

  try {
    await DB.Posts.update({
      title: req.body.title,
      content: req.body.content,
      favcnt: req.body.favcnt,
      category: req.body.category,
      where: {
        post_id: req.body.id
      }
    }, { 
      lock: true,
      transaction: t 
    });

    await t.commit();
  } catch(err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
}; //게시글 수정