const { Sequelize, Transaction} = require('sequelize');
const DB = require("../models/index");
const { globalSendRes: errRes } = require("../utility");
const { hasSession, isAdmin } = require("../authCheck");

exports.getCommentsByPost = async (req, res, next) => {
    await DB.sequelize.transaction(async (t) => { 
        try {
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
        } catch(err) {
            await t.rollback();
            next(err);
        }
    });
};

exports.getCommentsByUser = async (req, res, next) => {
    if(!hasSession(req, res)) {
        errRes(res, 401, "로그인이 필요합니다");
    }

    try {
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
    if(!isAdmin(req, res)) {
        errRes(res, 401, "unauthorized");
    }

    try {
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
    await DB.sequelize.transaction(async (t) => {
        try {
            await DB.Comments.create({
                post_id: req.body.postId,
                content: req.body.content,
                user_id: req.session.user_id
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
};

exports.deleteComments = async (req, res, next) => {
    if(!hasSession(req, res)) { 
        errRes(res, 401, "unauthorized"); 
        return;
    }

    await DB.sequelize.transaction(async (t) => {
        try {
            await DB.Comments.destroy({
                where: {
                    comment_id: req.body.commentId
                },
                lock: true,
                transaction: t 
            });
    
            res.sendStatus(200);
        } catch(err) {
            await t.rollback();
            next(err);
        }
    });
};

exports.patchComments = async (req, res, next) => {
    if(!hasSession(req, res)) { 
        errRes(res, 401, "unauthorized"); 
        return;
    }

    await DB.sequelize.transaction(async (t) => {
        try {
            await DB.Comments.update({
                content: req.body.content || comment.content
            }, {
                where: {
                    comment_id: req.body.commentId
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
};