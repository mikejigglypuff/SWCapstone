const express = require("express");
const crypto = require("crypto");
const User = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  if(id && pw) {
    const user = await User.findOne({where: {id: id}});

    if(user) {
      req.session.is_Logined = true;
      req.session.name = crypto.randomUUID();
      req.session.save(() => {
        res.redirect("/");
      })

    } else {
      res.send(`
      <script type="text/javascript">
        alert("로그인 정보가 일치하지 않습니다."); 
        document.location.href="/login";
      </script>`);
    }
  }
});

module.exports = router;