import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import findIDPWStyled from "../css/findIDPW.module.css";

const FindPW = () => {

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const [emailMessage, setEmailMessage] = useState("");
    const [isemail, setIsEmail] = useState(false);

    const onIdChange = (e) => {
        setId(e.target.value);
        console.log(e.target.value);
    };

    const onEmailChange = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if(!emailRegEx.test(currentEmail)){
            setEmailMessage("올바른 이메일 형식이 아닙니다.");
            setIsEmail(false);
        }// 이메일 조건식과 입력한 값이 일치하지 않은 경우
        else{
            setEmailMessage("올바른 이메일 형식을 사용하였습니다");
            setIsEmail(true);
        }// 이메일 조건식과 입력한 값이 일치한 경우
    }

    const navigate = useNavigate();

    const sendUsersInfos= async() => {
        try{
            const response = await axios.get(`https://www.healthintalk.net/replacePW/?id=${id}&email=${email}`);
            console.log(response);
                const changePWToken = response.data;
                if (changePWToken){
                    localStorage.removeItem('changePW-token');
                    localStorage.setItem('changePW-token', changePWToken);
                    console.log(changePWToken);   
                }// 이메일 토큰 저장하는 부분
                navigate('/nreplacePW');
        }catch(error){
            console.error("댓글 정보를 가져오는 도중 에러 발생", error);
        }
    } 

    return (
        <div className={findIDPWStyled.findIDPW}>
            <div className={findIDPWStyled.FIPtitle}>
                <img src="/static/img/logo.png"></img>
                <p>비밀번호 찾기</p>
            </div>
            <div className={findIDPWStyled.findIDPWInfoArea}>
                <div className={findIDPWStyled.enterID}>
                    <label htmlFor="id">아이디</label>
                    <input 
                        id="id"
                        type="text"  
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={onIdChange}
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
                        <p style={{color: isemail === false ? "red" : "green", marginLeft:"8rem"}}>{emailMessage}</p>
                    </div>
                </div>
                <div className={findIDPWStyled.FIPbtnArea}>
                    <button onClick={sendUsersInfos}>비밀번호 찾기</button> 
                </div>
            </div>
        </div>
    );
}

export default FindPW;