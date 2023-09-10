import React from "react";
import "../css/findIDPW.css";

const findID = () => {
    return (    
        <div className="enterInfo">
            <form>
                <label for="enterName">이름</label>
                <input type="text" id="enterName" placeholder="이름를 입력하세요" /><br />
                <p id="enterPhonenum">
                    <label for="enterPhone">휴대전화</label>
                    <input type="text" id="enterPhone" placeholder="휴대전화 번호를 입력하세요" />
                    <button id="getCode">인증번호 받기</button>
                </p>
                <label for="enterAuthCode">인증번호 입력</label>
                <input type="text" id="enterAuthCode" placeholder="인증 번호를 입력하세요" />
            </form><br />
            <button id="findMyID">아이디 찾기</button>
        </div>
    );
}

export default findID;