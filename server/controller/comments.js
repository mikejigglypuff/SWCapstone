const Sequelize = require('sequelize');
const DB = require("../models/index");
const { errRes } = require("../utility");
const { hasSession } = require("../authCheck");

exports.getCommentsByPost = async (req, res, next) => {
    const t = await DB.sequelize.transaction();
    const post = DB.Posts.findOne({
        raw: true,
        where: {
            post_id: req.params.postId,
            deletedAt: null
        }
    });

    if(post) { 
        errRes(res, 404, "post not found"); 
        return;
    }

    try {
        const comments = await DB.Comments.findAll({
            raw: true,
            nest: true,
            where: {
                post_id: req.body.postId,
                deletedAt: null
            }
        }, {
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
            lock: true,
            transaction: t
        });

        t.afterCommit(() => {
            console.log(comments);
            res.status(200).json(JSON.stringify(comments));
        });

        await t.commit();
    } catch(err) {
        await t.rollback();
        err.status = 500;
        console.error(err);
        next(err);
    }
};

exports.postComments = async (req, res, next) => {
    const post = DB.Posts.findOne({
        raw: true,
        where: {
            post_id: req.session.user_id,
            deletedAt: null
        }
    });

    const user = DB.Users.findOne({
        where: {
            user_id: req.session.user_id,
            deletedAt: null
        }
    });

    if(!post) {
        errRes(res, 404, "post not found"); 
        return;
    }
    if(!user) {
        errRes(res, 404, "user not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.Comments.create({
            post_id: req.body.postId,
            content: req.body.content,
            user_id: req.session.user_id
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
        err.status = 500;
        console.error(err);
        next(err);
    }
};

exports.deleteComments = async (req, res, next) => {
    if(!hasSession(req, res)) { 
        errRes(res, 401, "unauthorized"); 
        return;
    }
    
    const comment = DB.Comments.findOne({
        raw: true,
        where: {
            comment_id: req.body.commentId,
            deletedAt: null
        }
    });

    if(!comment) {
        errRes(res, 404, "comment not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.Comments.destroy({
            where: {
                comment_id: req.body.commentId
            },
            lock: true,
            transaction: t 
        });

        t.afterCommit(() => {
            res.sendStatus(200);
        });

        await t.commit();
    } catch(err) {
        await t.rollback();
        err.status = 500;
        console.error(err);
        next(err);
    }
};

exports.patchComments = async (req, res, next) => {
    if(!hasSession(req, res)) { 
        errRes(res, 401, "unauthorized"); 
        return;
    }

    const comment = DB.Comments.findOne({
        raw: true,
        where: {
            comment_id: req.body.commentId,
            deletedAt: null
        }
    });

    if(!comment) {
        errRes(res, 404, "comment not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
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

        t.afterCommit(() => {
            res.sendStatus(200);
        });

        await t.commit();
    } catch(err) {
        await t.rollback();
        err.status = 500;
        console.error(err);
        next(err);
    }
};