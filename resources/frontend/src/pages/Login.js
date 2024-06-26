import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const sendingLoginData = async() => {
        try {    
                const response = await axios.post('https://www.healthintalk.net/login/auth', {
                    "id": id,
                    "pw": password,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log(response);

                const userId = response.data.user_id; // user 아이디 로컬스토리지에 저장
                if (userId){
                    localStorage.setItem('usersId', userId);
                    console.log(userId);   
                }

                alert("로그인이 완료하였습니다.");
                navigate('/');
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return (
        <div className={loginStyled.Login}>
            <div className={loginStyled.title}>
                <img src="/static/img/logo.png" />
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