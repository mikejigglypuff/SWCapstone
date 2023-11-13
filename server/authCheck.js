module.exports = {
  //회원 로그인 여부 체크
  hasSession: (req, res) => {
    if(req.session && req.session.is_Logined) {
      return true;
    }
    return false;
  },

  //관리자 여부 체크
  isAdmin: (req, res) => {
    if(req.session && req.session.is_Admin) {
      return true;
    }
    return false;
  }
}
