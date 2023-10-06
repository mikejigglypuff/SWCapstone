import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import loginStyled from "../css/login.module.css"

const Login = () => {
    
    const [id, setID] = useState("");
    const [password, setPassword] = useState("");

    const onIDChange = (e) => {
        setID(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const sendingLoginData = async() => {
        try {    
                const response = await axios.post('/login/auth', {
                    "id": id,
                    "pw": password,
                });
        
                console.log('Server response:', response.data);
                alert("로그인이 완료하였습니다.");
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return (
        <div className={loginStyled.Login}>
            <div className={loginStyled.title}>
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" />
            </div>
            <div className={loginStyled.enterLoginInfo}>
                <label htmlFor="id">ID</label>
                <input 
                    id="id"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={onIDChange}
                /><br />
                <label htmlFor="password">비밀번호</label>
                <input 
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={onPasswordChange}
                />
            </div>
            <div className={loginStyled.btnArea}>
                <button onClick={sendingLoginData}>로그인</button>
                <div className={loginStyled.movePage}>
                    <Link style={{textDecoration:"none", color: "navy"}} to='/joinmembership'><p>회원가입</p></Link>
                    <Link style={{textDecoration:"none", color: "black"}} to='/findID'><p>ID찾기</p></Link>
                    <Link style={{textDecoration:"none", color: "black"}} to='/findPW'><p>PW찾기</p></Link>
                </div>
            </div>
        </div>
    );
};
export default Login