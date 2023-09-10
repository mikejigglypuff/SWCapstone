import React from "react";
import "../css/login.css"

const Login = () => {
    return (
        <div className="Login">
            <div className="title">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" />
            </div>
            <div className="enterLoginInfo">
                <label htmlFor="id">ID</label>
                <input 
                    id="id"
                    placeholder="아이디를 입력하세요"
                    // value={id}
                    // onChange={}
                /><br />
                <label htmlFor="password">비밀번호</label>
                <input 
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                // value={password}
                // onChange={}
                />
            </div>
            <div className="btnArea">
                <button>로그인</button>
                <div className="movePage">
                    <p>회원가입</p>
                    <p>ID찾기</p>
                    <p>PW찾기</p>
                </div>
            </div>
        </div>
    );
};
export default Login