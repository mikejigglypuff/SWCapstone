const DB = require("../models/index");
const { hasSession } = require("../authCheck");

exports.getDiary = async (req, res, next) => {
    const session = hasSession(req, res);
    if(!session) { return res.status(401).send("로그인이 필요합니다"); }

    try {
        const diary = await DB.UserDiary.findAll({
            attributes: { exclude: ["deletedAt", "userUserId"]},
            raw: true,
            nest: true,
            where: {
                user_id: req.session.user_id,
                deletedAt: null
            }
        });
        res.json(diary);
    } catch(err) {
        next(err);
    }
}; //로그인한 회원의 다이어리 조회

exports.postDiary = async (req, res, next) => {
    const session = hasSession(req, res);
    if(!session) { return res.status(401).send("로그인이 필요합니다"); }

    try {
        await DB.UserDiary.create({
            user_id: req.session.user_id,
            weight: req.body.weight,
            bodyFat: req.body.bodyfat || null,
            muscle: req.body.muscle || null,
            bodyParts: req.body.bodyParts,
            content: req.body.content || null
        });

        res.sendStatus(200);
    } catch(err) {
        next(err);
    }
}; //다이어리 작성