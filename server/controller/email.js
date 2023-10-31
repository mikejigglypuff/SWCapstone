const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.json");
const session = require("../config/session.json");
const jwt = require("jsonwebtoken");
const { genRandNum } = require("../utility");

exports.sendEmail = async (req, res) => {
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
            res.sendStatus(400);
        } else {
            console.log("메일 전송 완료", info.response);
            transporter.close();

            const token = jwt.sign({
                email: req.body.email,
                rand: randNum
            }, session.key, {
                expiresIn: "5m",
            });

            res.status(200).json(token);
        }
    });
}

exports.verifyEmail = async (req, res) => {
    const token = req.headers.authorization;

    jwt.verify(token, session.key, (err, decoded) => {
        console.log(token);
        if(err) {
            console.error(err);
            res.status(400).send("유효한 토큰이 존재하지 않음");
            return;
        } else {
            if(decoded.rand.toString() === req.body.verifyCode.toString()) {
                res.status(200).send("이메일 인증 완료");
            } else {
                res.status(401).send("이메일 인증 실패");
            } 
        }
    });
};