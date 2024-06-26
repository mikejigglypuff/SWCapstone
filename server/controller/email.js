const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.json");
const session = require("../config/session.json");
const jwt = require("jsonwebtoken");
const { genRandNum } = require("../utility");
const HttpError = require("../httpError");

exports.sendEmail = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: mailConfig.service || "gmail",
        host: "smtp.gmail.com",
        port: mailConfig.port || 567,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
        },
        secure: false
    });

    const randNum = genRandNum(111111, 999999);

    transporter.sendMail({
        from: mailConfig.user,
        to: req.body.email,
        subject: "인증 메일입니다",
        html: `
            <!DOCTYPE HTML>
            <p>5분 안에 인증 번호를 입력해주세요.</p>
            <h3>${randNum}</h3>
        `
    }, (err, info) => {
        if(err) { 
            console.error(err);
            err.status = 400;
            err.message = "잘못된 요청입니다";
            next(err);
        } else {
            console.log("메일 전송 완료", info.response);
            transporter.close();

            const token = jwt.sign({
                email: req.body.email,
                rand: randNum
            }, session.key, {
                expiresIn: "5m",
            });

            res.json(token);
        }
    });
}

exports.verifyEmail = (req) => {
    const token = req.headers.authorization;

    let email;
    jwt.verify(token, session.key, (err, decoded) => {
        if(err) {
            throw new HttpError(400, err.message);
        } else {
            if(decoded.rand.toString() === req.body.verifyCode.toString()) {
                email = decoded.email;
            } else {
                console.log("인증번호 불일치");
                throw new HttpError(400, "인증번호 불일치");
            } 
        }
    });

    return email;
};