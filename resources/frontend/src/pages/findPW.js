import React from "react";
import "../css/findIDPW.css";

const findPW = () => {
    return (
        <div className="enterInfo">
            <div className="id">
                <p id="id_Text">아이디</p>
                <input type="text" id="id_Input" />
            </div>
            <div className="phone">
                <p id="phone_Text">휴대전화</p>
                <input type="text" id="phone_Input" />
                <button id="get_Auth">인증번호 받기</button>
            </div>
            <div className="etc">
                <input type="text" inputmode="numeric" id="auth_Input" placeholder="인증번호 입력" />
                <button id="find_PW">비밀번호 찾기</button> 
            </div>
        </div>
    );
}

export default findPW;