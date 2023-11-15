const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const { errRes } = require("../utility");
const { hasSession, isAdmin } = require("../authCheck");

exports.getPost = async (req, res, next) => {
  const t = await DB.sequelize.transaction();

  try {
    const post = await DB.Posts.findOne({
      attributes: { exclude: ["deletedAt", "userUserId"] },
      raw: true,
      nest: true,
      where: {
        post_id: req.params.postId,
        deletedAt: null
      },
    }, {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      lock: true, 
      transaction: t
    });
    console.log(post);
    res.json(post);
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //특정 id의 게시글 조회

exports.getPostByCategory = async (req, res, next) => {
  const t = await DB.sequelize.transaction();
  
  try {
    const post = await DB.Posts.findAll({
      attributes: { exclude: ["deletedAt", "userUserId"] },
      raw: true,
      nest: true,
      where: {
        category: req.params.category,
        deletedAt: null
      },
    }, {
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      lock: true, 
      transaction: t
    });
    console.log(post);
    
    
    res.json(post);
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //게시판 별 게시글 조회

exports.getAllPost = async (req, res, next) => {
  if(!isAdmin(req, res)) {
    errRes(res, 401, "unauthorized");
  }
  
  try {
    await DB.sequelize.transaction(async (t) => {
      const posts = await DB.Posts.findAll({
        attributes: { exclude: ["deletedAt", "userUserId"] },
        raw: true,
        nest: true,
        where: {
          deletedAt: null
        },
      }, { transaction: t });

      res.status(200).json(posts);
    });
  } catch(err) {
    err.status = 404;
    console.error(err);
    next(err);
  }
}; //전체 게시글 정보 조회

exports.postPost = async (req, res, next) => {
  const userId = await DB.Users.findOne({
    raw: true,
    attributes: ['user_id'],
    where: {
      user_id: req.session.user_id,
      deletedAt: null
    }
  });

  if(!userId) { 
    errRes(res, 404, "user not found"); 
    return;
  }

  console.log(userId);
  const t = await DB.sequelize.transaction();
  try {
    const post = await DB.Posts.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      user_id: userId.user_id,
      favcnt: 0
    }, { 
      lock: true,
      transaction: t
    });

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
  if(!hasSession(req, res)) { 
    errRes(res, 401, "unauthorized"); 
    return;
  }

  const post = await DB.Posts.findOne({
    raw: true,
    where: {
      post_id: req.body.id
    }
  });

  if(!post) { 
    errRes(res, 404, "page not found"); 
    return;
  }

  const t = await DB.sequelize.transaction();
  try {
    await DB.Posts.destroy({
      where: {
        post_id: req.body.id
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
}; //게시글 삭제

exports.patchPost = async (req, res, next) => {
  if(!hasSession(req, res)) { 
    errRes(res, 401, "unauthorized"); 
    return;
  }

  const t = await DB.sequelize.transaction();
  try {
    DB.Posts.findOne({
      raw: true,
      where: {
        post_id: req.body.id,
        deletedAt: null
      }
    }).then((post) => {
      if(req.body.favcnt){ 
        DB.Posts.increment("favcnt", {
          where: {
            post_id: req.body.id
          }
        }).then((result) => {
          res.status(200).send(`${post.favcnt + 1}`);
        }); 
      } else {
        DB.Posts.update({
          title: req.body.title || post.title,
          content: req.body.content || post.content,
          category: req.body.category || post.category
        }, {
          where: {
            post_id: req.body.id
          },
        }, { 
          lock: true,
          transaction: t 
        }).then(() => { res.status(200).send("게시글 수정 완료"); })
      }
    });

    await t.commit();
  } catch(err) {
    t.rollback().then(() => {
      console.error(err);
      next(err);
    });
  }
}; //게시글 수정