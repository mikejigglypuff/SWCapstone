const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const { isAdmin, hasSession, checkSameID } = require("../authCheck");

exports.getCommentsByPost = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => { 
            const comments = await DB.Comments.findAll({
                raw: true,
                nest: true,
                attributes: { exclude: ["deletedAt", "userUserId", "postPostId"] },
                where: {
                    post_id: req.params.commentId,
                    deletedAt: null
                }
            }, {
                isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
                lock: true,
                transaction: t
            });

            res.json(comments);
        });
    } catch(err) {
        next(err);
    }
}; //게시글에 달린 댓글 조회

exports.getCommentsByUser = async (req, res, next) => {
    try {
        hasSession(req, res);

        const comments = await DB.Comments.findAll({
            raw: true,
            nest: true,
            attributes: { exclude: ["deletedAt", "userUserId", "postPostId"] },
            where: {
                user_id: req.session.user_id,
                deletedAt: null
            }
        });

        res.json(comments);
    } catch(err) {
        next(err);
    }
}; //자신이 작성한 댓글 조회

exports.getAllComments = async (req, res, next) => {
    try {
        isAdmin(req, res);

        await DB.sequelize.transaction(async (t) => {
            const comments = await DB.Comments.findAll({
                raw: true,
                nest: true,
                attributes: { exclude: ["deletedAt", "userUserId", "postPostId"] },
                where: {
                    deletedAt: null
                }
            }, { transaction: t });

            res.json(comments);
        });

    } catch(err) {
        next(err);
    }
}; //관리자 권한으로 모든 댓글 조회

exports.postComments = async (req, res, next) => {
    try {
        hasSession(req, res);

        await DB.sequelize.transaction(async (t) => {
            await DB.Comments.create({
                post_id: req.body.postId,
                content: req.body.content,
                user_id: req.session.user_id
            }, { 
                lock: true, 
                transaction: t 
            });
    
            res.sendStatus(201);
        });
    } catch(err) {
        next(err);
    }
}; //댓글 작성

exports.deleteComments = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => {
            const comment = await DB.Comments.findOne({
                where: {
                    comment_id: req.params.commentId
                }
            });

            checkSameID(req, res, comment.user_id);

            await DB.Comments.destroy({
                where: {
                    user_id: req.session.user_id,
                    comment_id: req.params.commentId
                }
            }, {
                lock: true,
                transaction: t 
            });
    
            res.sendStatus(204);
        });
    } catch(err) {
        next(err);
    }
}; //자신의 댓글 삭제

exports.deleteCommentsByAdmin = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => {
            await DB.Comments.destroy({
                where: {
                    user_id: req.session.user_id,
                    comment_id: req.body.comment_id
                }
            }, {
                lock: true,
                transaction: t 
            });
    
            res.sendStatus(204);
        });
    } catch(err) {
        next(err);
    }
}; //운영자 권한으로 댓글 삭제

exports.patchComments = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => {
            const comment = await DB.Comments.findOne({
                where: {
                    comment_id: req.body.commentId
                }
            });

            checkSameID(req, res, comment.user_id);

            await DB.Comments.update({
                content: req.body.content,
                updatedAt: Sequelize.fn('now')
            }, {
                where: {
                    user_id: req.session.user_id,
                    comment_id: req.body.commentId
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
}; //자신의 댓글 수정