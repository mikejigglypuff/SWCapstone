const write_btn = document.getElementById("write");

write_btn.addEventListener("click", async () => {
  const title = document.getElementById("inputTitle").value;
  const content = document.getElementById("inputText").value;

  fetch("./post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      content: content
    })
  }).then((res) => {
    console.log(res.text());
    window.location.href = res.url;
  }).catch((err) => {
    console.log(err);
  });
});