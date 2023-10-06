import React from "react";
import { Link } from "react-router-dom";
import hearderStyled from "../css/header.module.css";

const Header = () => {
    return(
        <div className={hearderStyled.Header}>
            <Link to="/"><img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" /></Link>
            <nav className = {hearderStyled.menubar}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="board/자유게시판">자유게시판</Link></li>
                    <li><Link to="board/식단&운동 공유 게시판">식단&운동 공유 게시판</Link></li>
                    <li><Link to="/searchfitnesscenter">내 주변 헬스장 찾기</Link></li>
                    <li><Link to="board/공지게시판">공지게시판</Link></li>
                </ul>
            </nav>
            <Link style={{textDecoration:"none", color: "navy"}} to="/login"><button>로그인</button></Link>
        </div>
    );
}
export default Header