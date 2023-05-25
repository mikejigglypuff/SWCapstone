const express = require("express");
const path = require("path");

const pageRouter = require("./routes/page");
const userRouter = require("./routes/users");
var sequelize = require('./models').sequelize;
const app = express();
sequelize.sync();

//8001번 port에서 열림, 템플릿 엔진 사용
app.engine("html", require("ejs").renderFile);
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");

// css, frontend js 파일 등 정적 파일에 대한 경로를 제공하는 미들웨어 
app.use("/", express.static("../resources/main"));
app.use("/login", express.static("../resources/login"));
app.use("/findIDPW", express.static("../resources/login/findIDPW"));
app.use("/join", express.static("../resources/login/joinMembership"));
app.use("/replace", express.static("../resources/login"));
app.use("/board", express.static("../resources/board"));
app.use("/img", express.static("../resources/img"));
app.user("/user", userRouter);
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