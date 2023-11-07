const DB = require("../models/index");

exports.getDiary = async (req, res, next) => {
    if(!req.session) {
        err.status = 403;
        console.error(err);
        next(err);
    }

    try {
        const diary = DB.UserDiary.findAll({
            attributes: { exclude: ["deletedAt"]},
            where: {
                user_id: req.session.user_id,
                deletedAt: null
            }
        });
        res.status(200).json(JSON.stringify(diary));
    } catch(err) {
        err.status = 404;
        console.error(err);
        next(err);
    }
}; //로그인한 회원의 다이어리 조회

exports.postDiary = async (req, res, next) => {
    if(!req.session) {
        err.status = 403;
        console.error(err);
        next(err);
    }

    const t = await DB.sequelize.transaction();
    try {
        await DB.UserDiary.create({
            user_id: req.session.user_id,
            weight: req.body.weight,
            bodyFat: req.body.bodyfat || null,
            muscle: req.body.muscle || null,
            bodyParts: req.body.bodyParts,
            content: req.body.content || null
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
}; //다이어리 작성