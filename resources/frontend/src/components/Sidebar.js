import React from "react";
import { Link } from "react-router-dom";
import sidebarStyled from "../css/sidebar.module.css";

const Sidebar = () => {
    return(
        <div className={sidebarStyled.Sidebar}>
            <div className={sidebarStyled.SDheader}>
                <Link to="/mypage" style={{textDecoration:"none", color: "black"}}><h2 style={{paddingBottom: "1rem"}}>👤 마이페이지</h2></Link>
                <p><strong>홍길동님</strong></p>
            </div>
            <div className={sidebarStyled.menubar}>
                <div className={sidebarStyled.items}>
                    <Link to="/replacePW" style={{textDecoration:"none", color: "black"}}><p>비밀번호 변경</p></Link>
                </div>
                <div className={sidebarStyled.items}>
                <Link to="/checkwriting" style={{textDecoration:"none", color: "black"}}><p>작성한 글 확인</p></Link>
                </div>
                <div className={sidebarStyled.items}>
                    <Link to="/unregister" style={{textDecoration:"none", color: "black"}}><p>회원 탈퇴</p></Link>
                </div>
            </div>
        </div>
    );
}
export default Sidebar