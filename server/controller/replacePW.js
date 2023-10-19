const Sequelize = require('sequelize');
const DB = require("../models/index");
const crypto = require("crypto");
const session = require("../config/session.json");
const jwt = require("jsonwebtoken");
const salt = require("../config/salt.json");
const { errRes } = require("../utility");

exports.getUserByEmailID = async (req, res, next) => {
    try {
        const user = DB.Users.findOne({
            raw: true,
            where: {
                user_id: req.query.userid,
                email: req.query.email
            }
        });
        if(!user) {
            errRes(res, 404, "user not found"); 
            return;
        }

        const token = jwt.sign({
            id: user.user_id,
            email: user.email
        }, session.key, {
            expiresIn: "10m",
        });

        res.status(200).json(token);
    } catch(err) {
        console.error(err);
        next(err);
    }
};

exports.replacePW = async (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, session.key, (err, decoded) => {
        if(err) {
            errRes(res, 401, "authorization failed");
            return;
        } else {
            DB.Users.update({
                password: crypto.pbkdf2Sync(
                    req.body.pw, salt.salt, 105735, 64, "sha512"
                ).toString(),
                where: {
                    user_id: decoded.id
                }
            }).then((user) => {
                res.sendStatus(200);
            }).catch((err) => {
                console.error(err);
                next(err);
            })
        }
    });
};