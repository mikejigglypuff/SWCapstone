const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const { addOrRemoveArr } = require("../utility");
const { isAdmin, hasSession, checkSameID } = require("../authCheck");

exports.getPost = async (req, res, next) => {
  try {
    await DB.sequelize.transaction(async (t) => {
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
      post.favcnt = post.favcnt.split(",").filter(Boolean).length;
      
      res.json(post);
    });
  } catch(err) {
    next(err);
  }
}; //특정 id의 게시글 조회

exports.getPostByCategory = async (req, res, next) => {
  try{
    await DB.sequelize.transaction(async (t) => {
      const posts = await DB.Posts.findAll({
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
      posts.forEach(post => { post.favcnt = post.favcnt.split(",").filter(Boolean).length; });

      res.json(posts);
    });
  } catch(err) {
    next(err);
  }
}; //게시판 별 게시글 조회

exports.getPostsByUser = async (req, res, next) => {
  try {
    hasSession(req, res);

    const posts = await DB.Posts.findAll({
      attributes: { exclude: ["deletedAt", "userUserId"] },
        raw: true,
        nest: true,
        where: {
          user_id: req.session.user_id,
          deletedAt: null
        }
    });
    posts.forEach(post => { post.favcnt = post.favcnt.split(",").filter(Boolean).length; });
    
    res.json(posts);
  } catch(err) {
    next(err);
  }
};

exports.getAllPost = async (req, res, next) => {  
  try {
    await DB.sequelize.transaction(async (t) => {
      isAdmin(req, res);

      const posts = await DB.Posts.findAll({
        attributes: { exclude: ["deletedAt", "userUserId"] },
        raw: true,
        nest: true,
        where: {
          deletedAt: null
        },
      }, { transaction: t });

      posts.forEach(post => { post.favcnt = post.favcnt.split(",").filter(Boolean).length; });

      res.json(posts);
    });
  } catch(err) {
    next(err);
  }
}; //전체 게시글 정보 조회

exports.postPost = async (req, res, next) => {
  try {
    await DB.sequelize.transaction(async (t) => {
      await DB.Posts.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        user_id: req.session.user_id,
        favcnt: ""
      }, { 
        lock: true,
        transaction: t
      });
  
      res.sendStatus(200);
    });
  } catch(err) {
    next(err);
  }
}; //게시글 등록

exports.deletePost = async (req, res, next) => {
  try {
    await DB.sequelize.transaction(async (t) => {
      const post = DB.Posts.findOne({
        where: {
          post_id: req.params.postId
        }
      }, { 
        lock: true,
        transaction: t 
      });

      checkSameID(req, res, post);

      await DB.Posts.destroy({
        where: {
          user_id: req.session.user_id,
          post_id: req.params.postId
        }
      }, { 
        lock: true,
        transaction: t 
      });
  
      res.sendStatus(200);
    });
  } catch(err) {
    next(err);
  }
}; //게시글 삭제

exports.deletePostByAdmin = async (req, res, next) => {
  try {
    isAdmin(req, res);

    await DB.sequelize.transaction(async (t) => {
      await DB.Posts.destroy({
        where: {
          post_id: req.body.post_id
        }
      }, { 
        lock: true,
        transaction: t 
      });
  
      res.sendStatus(200);
    });
  } catch(err) {
    next(err);
  }
}; //운영자가 직접 게시글 삭제

exports.patchPost = async (req, res, next) => {
  let split;
  try {
    await DB.sequelize.transaction(async (t) => {
      const post = await DB.Posts.findOne({
        raw: true,
        where: {
          post_id: req.body.id,
          deletedAt: null
        }
      });
      if(req.body.favcnt){ 
        const favId = await DB.Posts.findOne({
          raw: true,
          attributes: ["favcnt"],
          where: {
            post_id: req.body.id
          }
        });
        split = addOrRemoveArr(favId.favcnt.split(","), req.session.user_id);
        
        await DB.Posts.update({
          favcnt: split.toString()
        }, {
          where: {
            post_id: req.body.id
          }
        });

        res.json({ favcnt: split.length });
      } else {
        const post = DB.Posts.findOne({
          where: {
            post_id: req.body.postId
          }
        }, { 
          lock: true,
          transaction: t 
        });
  
        checkSameID(req, res, post);

        await DB.Posts.update({
          title: req.body.title || post.title,
          content: req.body.content || post.content,
          category: req.body.category || post.category,
          updatedAt: Sequelize.fn('now')
        }, {
          where: {
            user_id: req.session.user_id,
            post_id: req.body.id
          },
        }, { 
          lock: true,
          transaction: t 
        });  

        res.sendStatus(200);
      }
    });
  } catch(err) {
    next(err);
  }
}; //자신의 게시글 수정 또는 추천 수 증가