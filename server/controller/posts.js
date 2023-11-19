const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const { globalSendRes: errRes } = require("../utility");
const { isAdmin, hasSession } = require("../authCheck");

exports.getPost = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  await DB.sequelize.transaction(async (t) => {
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

      res.json(post);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //특정 id의 게시글 조회

exports.getPostByCategory = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  await DB.sequelize.transaction(async (t) => {
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

      res.json(post);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //게시판 별 게시글 조회

exports.getPostsByUser = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  try {
    const posts = await DB.Posts.findAll({
      attributes: { exclude: ["deletedAt", "userUserId"] },
        raw: true,
        nest: true,
        where: {
          user_id: req.session.user_id,
          deletedAt: null
        }
    });

    res.json(posts);
  } catch(err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {
  const is_Admin = isAdmin(req, res);
  if(!is_Admin) { return res.status(401).send("로그인이 필요합니다"); }
  else if(is_Admin === "user") { return res.status(403).send("접근 권한이 없습니다"); }
  
  await DB.sequelize.transaction(async (t) => {
    try {
      const posts = await DB.Posts.findAll({
        attributes: { exclude: ["deletedAt", "userUserId"] },
        raw: true,
        nest: true,
        where: {
          deletedAt: null
        },
      }, { transaction: t });

      res.json(posts);
    } catch(err) {
      await t.rollback();
      next(err);
    } 
  });
}; //전체 게시글 정보 조회

exports.postPost = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  await DB.sequelize.transaction(async (t) => {
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
  
      res.redirect("/board");
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //게시글 등록

exports.deletePost = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  //에러를 직접 띄워보고 쿼리가 반환하는 에러를 catch에서 처리할 수 있도록 변경하기

  await DB.sequelize.transaction(async (t) => {
    try {
      await DB.Posts.destroy({
        where: {
          post_id: req.body.id
        }
      }, { 
        lock: true,
        transaction: t 
      });
  
      res.sendStatus(200);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //게시글 삭제

exports.deletePostByAdmin = async (req, res, next) => {
  const is_Admin = isAdmin(req, res);
  if(!is_Admin) { return res.status(401).send("로그인이 필요합니다"); }
  else if(is_Admin === "user") { return res.status(403).send("접근 권한이 없습니다"); }

  await DB.sequelize.transaction(async (t) => {
    try {
      await DB.Posts.destroy({
        where: {
          post_id: req.body.post_id
        }
      }, { 
        lock: true,
        transaction: t 
      });
  
      res.sendStatus(200);
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //운영자가 직접 게시글 삭제

exports.patchPost = async (req, res, next) => {
  const session = hasSession(req, res);
  if(!session) { return res.status(401).send("로그인이 필요합니다"); }

  await DB.sequelize.transaction(async (t) => {
    try {
      const post = await DB.Posts.findOne({
        raw: true,
        where: {
          post_id: req.body.id,
          deletedAt: null
        }
      });
      if(req.body.favcnt){ 
        await DB.Posts.increment("favcnt", {
          where: {
            post_id: req.body.id
          }
        });
        res.status(200).send(`${post.favcnt + 1}`);

      } else {
        await DB.Posts.update({
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
        });
        res.sendStatus(200);
        
      }
    } catch(err) {
      await t.rollback();
      next(err);
    }
  });
}; //게시글 수정