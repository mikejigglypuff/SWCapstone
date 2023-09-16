const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy((err) => {
    if(err) { 
      err.status = 400;
      return next(err); 
    }
    res.status(200).redirect("/");
  })
});

module.exports = router;