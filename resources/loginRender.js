import axios from "axios";

module.exports = (url) => {
  axios.get(url)
    .then((res) => {
      let menu = document.getElementsByClassName("menu");
      let appends = document.createElement("a");;
      if(res.json.logined) {
        appends.id = logoutbtn;
        appends.href = "/logout";
      } else {
        appends.id = backbtn;
        appends.href = "/login";
      }
      menu.appendChild(appends);
    }).catch((err) => {
      console.log(err);
    })
}