exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
      if(err) { 
        err.status = 404;
        return next(err); 
      }
      res.status(302).redirect("/");
    })
};