import React from "react";
import Sidebar from "../components/Sidebar";
import mypageStyled from "../css/mypage.module.css";

const Mypage = () => {
    return(
        <div className={mypageStyled.Mypage}>
            <Sidebar />
            <div className={mypageStyled.showMyInfo}>
                <div className={mypageStyled.MPtitle}>
                    <img src="img/logo.png" />
                    <p>회원정보</p>
                </div>
                <div className={mypageStyled.myInfo}>
                    <p style={{color: "navy"}}>이름</p>
                    <p>홍길동</p>
                    <p style={{color: "navy"}}>아이디</p>
                    <p>abc123</p>
                    <p style={{color: "navy"}}>핸드폰 번호</p>
                    <p>010-1234-5678</p>
                    <p style={{color: "navy"}}>가입일</p>
                    <p>23-10-01</p>
                </div>    
            </div>
        </div>
    );
}
export default Mypage