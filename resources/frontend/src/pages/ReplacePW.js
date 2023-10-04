import React from "react";
import { useState } from "react";
import "../css/replacePW.css"

const ReplacePW = () => {
    const [beforePW, setBeforePW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [checkNewPW, setcheckNewPW] = useState("");

    const [pwMessage, setPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");

    const [isnewPW, setnewPW] = useState(false);
    const [ischeckNewPW, setIscheckNewPW] = useState(false);

    const onBeforePWChange = (e) =>{
        setBeforePW(e.target.value);
        console.log(e.target.value);
    };
    
     // 비밀번호 유효성 검사 함수
    //  const onPassWordChange = (e) => {
    //     const currentNewPW = e.target.value;
    //     setNewPW(currentNewPW);
    //     const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,18}$/;// 비밀번호 조건식
    //     if(!PasswordReg.test(currentNewPW)){
    //         setPwMessage("비밀번호는 최소 하나의 문자와 숫자 그리고 하나의 특수 문자를 포함한 8자 이상 18자 이하여야 합니다.");
    //         setIsPw(false);
    //     }// 비밀번호 조건식과 입력한 값이 일치하지 않은 경우
    //     else{
    //         setPwMessage("이 비밀번호를 사용할 수 있습니다.");
    //         setIsPw(true);
    //     }// 비밀번호 조건식과 입력한 값이 일치한 경우
    // }  

    // // 비밀번호 확인 유효성 검사 부분
    // const onCheckPWChange = (e) => {
    //     const currenCheckPW = e.target.value;
    //     setCheckPw(currenCheckPW);
    //     if(password !== currenCheckPW){
    //         setCheckPwMessage("비밀번호가 일치하지 않습니다.");
    //         setIsCheckPw(false);
    //     }
    //     else{
    //         setCheckPwMessage("비밀번호가 일치합니다.");
    //         setIsCheckPw(true);
    //     }
    // }

    return (
        <div className="ReplacePW">
            <div className="RPtitle">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" id="image" />
                <p id="title">비밀번호 변경</p>
            </div>
            <div className="enterNewPWArea">
                <div className="enterPW">
                    <label>현재 비밀번호</label>
                    <input
                        id="presentPW"
                        type="password"
                        placeholder="현재 비밀번호를 입력하세요"
                        // value={beforePW}
                        // onChange={onBeforePWChange}
                    />
                </div>
                <div className="enterNewPW">
                    <label>변경할 비밀번호</label>
                    <input
                        id="changePW"
                        type="password"
                        placeholder="변경할 비밀번호를 입력하세요"
                        // value={newPW}
                        // onChange={}
                    />
                </div>
                <div className="enterNewPW">
                    <label>변경할 비밀번호 확인</label>
                    <input
                        id="changePW"
                        type="password"
                        placeholder="변경할 비밀번호를 다시 한번 입력하세요"
                        // value={checkNewPW}
                        // onChange={}
                    />
                </div>
                <div className="RPbtnArea">
                    <button>비밀번호 변경</button>
                </div>
            </div>
        </div>
    );
}
export default ReplacePW