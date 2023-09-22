export const errRes = (res, status, msg) => {
    res.json({
      error: status + "Error",
      message: msg
    });
}