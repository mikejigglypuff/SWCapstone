module.exports = {
  hasSession: (req, res) => {
    if(req.session.is_Logined) {
      return true;
    }
    return false;
  }
}