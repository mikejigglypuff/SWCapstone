const checkPW = document.querySelector("#againEnterPW");

checkPW.addEventListener("keydown", (e) => {
    console.log("회원가입 수행 중");
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

const joinBtn = document.querySelector("#joinOurWeb");
joinBtn.addEventListener("click", () => {
    const ID = document.getElementById("enterId").value;
    const PW = document.getElementById("enterPassword").value;
    const PWCheck = document.getElementById("againEnterPW").value;
    const name = document.getElementById("enterName").value;
    const nickName = document.getElementById("enterNickname").value;
    const phoneNum = document.getElementById("enterPhoneNum").value;
    const verifyNum = document.getElementById("enterVericationCode").value;

    if(!ID || !PW || !PWCheck || !name || !nickName || !phoneNum || !verifyNum) {
        alert("사용자 정보를 빈칸없이 입력해주세요");
        return;
    }

    fetch("./user/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: ID,
            pw: PW,
            phoneNum: phoneNum
        })
    }).then((res) => {
        alert("회원가입이 완료되었습니다.");
        window.location.href = res.url;
    }).catch((err) => {
        console.log(err);
    });
});
