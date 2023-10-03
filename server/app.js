const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileStore = require("session-file-store")(session);

const pageRouter = require("./routes/page");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const logoutRouter = require("./routes/logout");
const commentRouter = require("./routes/comments");
const sessionConfig = require("./config/session.json");
let sequelize = require('./models').sequelize;
const app = express();
sequelize.sync({ alter: false });

//8001번 port에서 열림, 템플릿 엔진 사용
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("port", process.env.PORT || 8001);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: sessionConfig.key,
  resave: false,
  saveUninitialized: true,
  store: new fileStore(),
  cookie: {
    path: "/",
    httpOnly: false,
    secure: false
  }
}));

// css, frontend js 파일 등 정적 파일에 대한 경로를 제공하는 미들웨어 
app.use("/", express.static("../resources/main"));
app.use("/login", express.static("../resources/login"));
app.use("/findIDPW", express.static("../resources/login/findIDPW"));
app.use("/joinMembership", express.static("../resources/login/joinMembership"));
app.use("/replace", express.static("../resources/login"));
app.use("/board", express.static("../resources/board"));
app.use("/img", express.static("../resources/img"));
app.use("/searchFitnessCenter", express.static("../resources/searchFitnessCenter")); 

app.use("/login/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/logout", logoutRouter);
app.use("/post", postRouter);
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
  res.render("error", {
    error: err.status + "Error",
    message: err.message
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
