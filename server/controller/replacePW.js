const Sequelize = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const session = require("../config/session.json");
const jwt = require("jsonwebtoken");
const salt = require("../config/salt.json");
const { globalSendRes: errRes } = require("../utility");

exports.getUserByEmailID = async (req, res, next) => {
    try {
        const user = await DB.Users.findOne({
            raw: true,
            where: {
                user_id: req.query.id,
                email: req.query.email,
                deletedAt: null
            }
        });
        if(!user) {
            errRes(res, 404, "존재하지 않는 회원입니다"); 
        }

        const token = jwt.sign({
            id: user.user_id,
            email: user.email
        }, session.key, {
            expiresIn: "10m",
        });

        res.json(token);
    } catch(err) {
        next(err);
    }
};

exports.replacePW = async (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, session.key, async (err, decoded) => {
        if(err) {
            errRes(res, 401, "인증 실패");
            return;
        } else {
            try {
                console.log(decoded);

                await DB.Users.update({
                    password: crypto.pbkdf2Sync(
                        req.body.pw, salt.salt, 105735, 64, "sha512"
                    ).toString()
                }, {
                    where: {
                        user_id: decoded.id
                    }
                });
                res.sendStatus(200);
            } catch(err) {
                next(err);
            }
        }
    });
};