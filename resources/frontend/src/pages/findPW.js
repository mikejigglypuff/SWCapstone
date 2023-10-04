import React from "react";
import "../css/findIDPW.css";

const findPW = () => {
    return (
        <div className="findIDPW">
            <div className="FIPtitle">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213"></img>
                <p>비밀번호 찾기</p>
            </div>
            <div className="findIDPWInfoArea">
                <div className="enterID">
                    <label htmlFor="ids">아이디</label>
                    <input 
                        id="ids"
                        type="text"  
                        placeholder="아이디를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="enterPhone">
                    <div className="getCheckingCode">
                        <label htmlFor="phonenum">휴대전화</label>
                        <input
                            id="phonenum"  
                            type="text" 
                            placeholder="핸드폰 번호를 입력하세요"
                            // value={}
                            // onChange={}
                        />
                        <button>인증번호 받기</button>
                    </div>
                    <input 
                        id="checkPWCode"
                        type="text" 
                        inputmode="numeric" 
                        placeholder="인증번호 입력" 
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="FIPbtnArea">
                    <button>비밀번호 찾기</button> 
                </div>
            </div>
        </div>
    );
}

export default findPW;