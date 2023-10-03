const Sequelize = require('sequelize');
const DB = require("../models/index");
const { errRes } = require("../utility");

exports.getCommentsByPost = async (req, res, next) => {
    const t = await DB.sequelize.transaction();
    const post = DB.Posts.findOne({
        raw: true,
        where: {
            post_id: req.body.postId
        }
    });

    if(post) { 
        errRes(res, 404, "post not found"); 
        return;
    }

    try {
        const comments = await DB.comments.findAll({
            raw: true,
            nest: true,
            where: {
                post_id: req.body.postId
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
            post_id: req.body.postId
        }
    });

    if(!post) {
        errRes(res, 404, "post not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.comments.create({
            post_id: req.body.postId,
            content: req.body.content,
            user_id: req.body.userId
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
    const comment = DB.comments.findOne({
        raw: true,
        where: {
            comment_id: req.body.commentId
        }
    });

    if(!comment) {
        errRes(res, 404, "post not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.comments.destroy({
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
    const comment = DB.comments.findOne({
        raw: true,
        where: {
            comment_id: req.body.commentId
        }
    });

    if(!comment) {
        errRes(res, 404, "post not found"); 
        return;
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.comments.update({
            content: req.body.content,
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