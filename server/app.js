const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const cookies = require("cookie-parser");

const pageRouter = require("./routes/page");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const logoutRouter = require("./routes/logout");
const findIDRouter = require("./routes/findID");
const commentRouter = require("./routes/comments");
const sessionConfig = require("./config/session.json");
const config = require("./config/config.json");
const MySQLStore = require("express-mysql-session")(session);
let sequelize = require('./models').sequelize;
const app = express();
sequelize.sync();

//8001번 port에서 열림, 템플릿 엔진 사용
app.engine('html', require('ejs').renderFile);
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());
app.use(session({
  secret: sessionConfig.key,
  resave: true,
  saveUninitialized: false,
  is_Logined: false,
  user_id: null,
  store: new MySQLStore({
    host: config.development.host,
    port: config.development.port,
    user: config.development.username,
    password: config.development.password,
    database: config.development.database,
    clearExpired: true,
  }),
  cookie: {
    path: "/",
    httpOnly: false,
    secure: false,
    expires: 604800000
  },
  expires: 604800000
}));
app.use(cors({
  origin: "*"
}));

// css, frontend js 파일 등 정적 파일에 대한 경로를 제공하는 미들웨어 
app.use("/static/css", express.static(path.resolve(__dirname, "../resources/frontend/build/static/css")));
app.use("/static/js", express.static(path.resolve(__dirname, "../resources/frontend/build/static/js")));
app.use("/static/img", express.static(path.resolve(__dirname, "../resources/frontend/build/img")));

app.use("/login/auth", authRouter);
app.use("/comment", commentRouter);
app.use("/logout", logoutRouter);
app.use("/findID", findIDRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use(pageRouter);

//에러처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.sendStatus(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});