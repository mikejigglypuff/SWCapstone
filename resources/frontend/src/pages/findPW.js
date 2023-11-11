import React from "react";
import findIDPWStyled from "../css/findIDPW.module.css";

const findPW = () => {
    return (
        <div className={findIDPWStyled.findIDPW}>
            <div className={findIDPWStyled.FIPtitle}>
                <img src="img/logo.png"></img>
                <p>비밀번호 찾기</p>
            </div>
            <div className={findIDPWStyled.findIDPWInfoArea}>
                <div className={findIDPWStyled.enterID}>
                    <label htmlFor="id">아이디</label>
                    <input 
                        id="id"
                        type="text"  
                        placeholder="아이디를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className={findIDPWStyled.enterEmail}>
                    <div className={findIDPWStyled.getCheckingCode}>
                        <label htmlFor="email">이메일</label>
                        <input
                            id={findIDPWStyled.email}  
                            type="text" 
                            placeholder="이메일을 입력하세요"
                            // value={}
                            // onChange={}
                        />
                        <button>인증번호 받기</button>
                    </div>
                    <input 
                        id={findIDPWStyled.checkPWCode}
                        type="text" 
                        inputmode="numeric" 
                        placeholder="인증번호 입력" 
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className={findIDPWStyled.FIPbtnArea}>
                    <button>비밀번호 찾기</button> 
                </div>
            </div>
        </div>
    );
}

export default findPW;