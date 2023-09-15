import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = () => {
    return(
        <div className="Header">
            <Link to="/"><img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" /></Link>
            <nav className = "menubar">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">자유게시판</a></li>
                    <li><a href="">식단&운동 공유 게시판</a></li>
                    <li><a href="">내 주변 헬스장 찾기</a></li>
                    <li><a href="">공지</a></li>
                </ul>
            </nav>
            <Link style={{textDecoration:"none", color: "navy"}} to="/login"><button>로그인</button></Link>
        </div>
    );
}
export default Header