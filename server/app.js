const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mysqlStore = require("express-mysql-session")(session);

const pageRouter = require("./routes/page");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const logoutRouter = require("./routes/logout");
const sessionConfig = require("./config/session.json");
const sessionStore = new mysqlStore(sessionConfig.connection);
let sequelize = require('./models').sequelize;
const app = express();
sequelize.sync();

//8001번 port에서 열림, 템플릿 엔진 사용
app.engine("html", require("ejs").renderFile);
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: sessionConfig.key,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false
  }
}));

// css, frontend js 파일 등 정적 파일에 대한 경로를 제공하는 미들웨어 
app.use("/", express.static("../resources/main"));
app.use("/login", express.static("../resources/login"));
app.use("/findIDPW", express.static("../resources/login/findIDPW"));
app.use("/join", express.static("../resources/login/joinMembership"));
app.use("/replace", express.static("../resources/login"));
app.use("/board", express.static("../resources/board"));
app.use("/img", express.static("../resources/img"));

app.use("/login/auth", authRouter);
app.use("/logout", logoutRouter);
app.use("/user", userRouter);
app.use("/", pageRouter);

//에러처리
app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
