module.exports = {
  hasSession: (req, res) => {
    if(req.session && req.session.is_Logined) {
      return true;
    }
    return false;
  }
}