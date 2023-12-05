import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import findIDPWStyled from "../css/findIDPW.module.css";

const FindID = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verifyCode, setVertifyCode] = useState("");
    const [userID, setUserID] = useState("");

    const onNameChange = (e) =>{
        setName(e.target.value);
        console.log(e.target.value);
    };

    const onEmailChange = (e) =>{
        setEmail(e.target.value);
        console.log(e.target.value);
    };

    //이메일 인증번호 받는 부분
    const checkEmailVertical = async() => {
        try {    
                const response = await axios.post('/emailAuth', {
                    "email": email
                });
                console.log(response);
                const emailToken = response.data;
                if (emailToken){
                    localStorage.removeItem('email-token');
                    localStorage.setItem('email-token', emailToken);
                    console.log(emailToken);   
                }// 이메일 토큰 저장하는 부분
                alert("입력한 이메일에서 인증번호를 받아와주세요")

          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    const onVertifyCode = (e) => {
        setVertifyCode(e.target.value);
        console.log(e.target.value);
    }

    // 입력한 정보를 통한 아이디 찾는 부분
    const sendingFindIdData = async() => {
        const ivertifyCode = parseInt(verifyCode);
        try {
                const emailToken = localStorage.getItem('email-token');
                const response = await axios.get('/findID', {
                    params: {
                        name: name,
                        verifyCode: ivertifyCode
                    },
                    headers: {
                        authorization: `${emailToken}`
                    }
                });
                console.log(response);
                setUserID(response.data);
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return (    
        <div className={findIDPWStyled.findIDPW}>
            <div className={findIDPWStyled.FIPtitle}>
                <img src="/static/img/logo.png"></img>
                <p>아이디 찾기</p>
            </div>
            <div className={findIDPWStyled.findIDPWInfoArea}>
                <div className={findIDPWStyled.enterID}>
                    <label htmlFor="name">이름</label>
                    <input 
                        id="name"
                        type="text"  
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={onNameChange}
                    />
                </div>
                <div className={findIDPWStyled.enterEmail}>
                    <div className={findIDPWStyled.getCheckingCode}>
                        <label htmlFor="email">이메일</label>
                        <input
                            id={findIDPWStyled.email} 
                            type="text" 
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={onEmailChange}
                        />
                        <button onClick={checkEmailVertical}>인증번호 받기</button>
                    </div>
                    <input 
                        id={findIDPWStyled.checkPWCode}
                        type="text" 
                        inputmode="numeric" 
                        placeholder="인증번호 입력" 
                        value={verifyCode}
                        onChange={onVertifyCode}
                    />
                </div>
                <div className={findIDPWStyled.FIPbtnArea}>
                    <button onClick={sendingFindIdData}>아이디 찾기</button> 
                    <p>당신의 아이디는 <span style={{fontSize: "1rem", color: "red", fontWeight: "bold"}}>{userID.userId}</span>입니다.</p>
                </div>
            </div>
        </div>
    );
}

export default FindID;