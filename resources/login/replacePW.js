var checkPW = document.getElementById("checkPW_input");

checkPW.addEventListener("keydown", (e) => {
  let result = document.getElementById("matchPW");

  if(document.getElementById("newPW_input").value === checkPW.value + e.key) {
    result.innerHTML = "비밀번호가 일치합니다";
  } else {
    result.innerHTML = "비밀번호가 일치하지 않습니다.";
  } 
});