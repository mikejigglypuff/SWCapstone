const { Sequelize } = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const session = require("../config/session.json");
const jwt = require("jsonwebtoken");
const HttpError = require("../httpError");

exports.verifyUserByEmailID = async (req, res, next) => {
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
            throw new HttpError(404, "일치하는 회원정보가 없습니다");
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
            throw new HttpError(400, err.message);
        } else {
            try {
                await DB.Users.update({
                    password: crypto.pbkdf2Sync(
                        req.body.pw, session.salt, session.iterations, session.len, session.hash
                    ).toString(),
                    updatedAt: Sequelize.fn('now')
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