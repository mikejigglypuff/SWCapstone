const login_btn = document.getElementById("login");

login_btn.addEventListener("click", async () => {
  const ID = document.getElementById("id_input").value;
  const PW = document.getElementById("pw_input").value;

  fetch("./login/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: ID,
      pw: PW
    })
  }).then((res) => {
    console.log(res.text());
    window.location.href = res.url;
  }).catch((err) => {
    console.log(err);
  });
});
