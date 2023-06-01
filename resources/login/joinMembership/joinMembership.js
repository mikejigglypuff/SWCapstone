const checkPW = document.querySelector("#againEnterPW");

checkPW.addEventListener("keydown", (e) => {
    const inputPW = document.querySelector("#enterPassword");
    let checking = document.querySelector("#checkPassword");

    if(inputPW.value === checkPW.value + e.key){
        checking.innerHTML = "비밀번호가 일치합니다.";
        checking.style.color = "green";
    }
    else{
        checking.innerHTML = "비밀번호가 일치하지 않습니다.";
        checking.style.color = "red";
    }
});
