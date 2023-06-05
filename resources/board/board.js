const axios = require("axios");

window.onload = axios.get("/board")
.then((res) => {
  let menu = document.querySelector(".menu");
  let child = `<a href=`;
  if(res.json.logined) {
    child += `"/logout">로그아웃`
  } else {
    child += `"/login">로그인`
  }
  menu.insertAdjacentElement("beforeend", child);
}).catch((err) => {
  console.log(err);
});