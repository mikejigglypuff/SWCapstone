module.exports = {
  hasSession: (req, res) => {
    if(req.session) {
      return true;
    }
    return false;
  }
}