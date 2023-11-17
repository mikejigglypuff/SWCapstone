exports.globalSendRes = (res, status, msg) => {
    return res.status(status || 500).send(msg || "서버 내부 에러");
};

exports.errRedirect = (res, status, url) => {
    return res.status(status || 302).redirect(url || "/");
};

exports.genRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};