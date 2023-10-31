exports.errRes = (res, status, msg) => {
    res.json({
      error: status + "Error",
      message: msg
    });
}

exports.errRedirect = (res, status, url) => {
    res.status(status).redirect(url);
}

exports.errRender = (res, page, status, msg) => {
    res.status(status).render(page, {
      error: status,
      message: msg
    });
}

exports.genRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}