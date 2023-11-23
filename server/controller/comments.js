const { Sequelize, Transaction } = require('sequelize');
const DB = require("../models/index");
const { isAdmin, hasSession } = require("../authCheck");

exports.getCommentsByPost = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => { 
            const comments = await DB.Comments.findAll({
                raw: true,
                nest: true,
                attributes: { exclude: ["deletedAt", "userUserId", "postPostId"] },
                where: {
                    post_id: req.params.postId,
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
};

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
};

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
};

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
    
            res.sendStatus(200);
        });
    } catch(err) {
        next(err);
    }
};

exports.deleteComments = async (req, res, next) => {
    try {
        hasSession(req, res);

        await DB.sequelize.transaction(async (t) => {
            await DB.Comments.destroy({
                where: {
                    comment_id: req.body.commentId
                },
                lock: true,
                transaction: t 
            });
    
            res.sendStatus(200);
        });
    } catch(err) {
        next(err);
    }
};

exports.deleteCommentsByAdmin = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => {
            await DB.Comments.destroy({
                where: {
                    comment_id: req.body.comment_id
                },
                lock: true,
                transaction: t 
            });
    
            res.sendStatus(200);
        });
    } catch(err) {
        next(err);
    }
}; //운영자가 직접 댓글 삭제

exports.patchComments = async (req, res, next) => {
    try {
        await DB.sequelize.transaction(async (t) => {
            await DB.Comments.update({
                content: req.body.content,
                updatedAt: Sequelize.fn('now')
            }, {
                where: {
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
};