const write_btn = document.getElementById("write");

write_btn.addEventListener("click", async () => {
  const Title = document.getElementById("inputTitle").value;
  const Content = document.getElementById("inputText").value;

  fetch("./post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: Title,
        content: Content
    })
  }).then((res) => {
    alert("게시글 등록 완료");
    window.location.href = res.url;
  }).catch((err) => {
      console.log(err);
  });
});