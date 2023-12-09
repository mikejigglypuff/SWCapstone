import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sidebarStyled from "../css/sidebar.module.css";

const Sidebar = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData()
    },[]);

    const fetchUserData = async() => {
        try{
            const response = await axios.get('https://healthintalk.duckdns.org/user');
            setUserData(response.data);
            console.log(response);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    return(
        <div className={sidebarStyled.Sidebar}>
            <div className={sidebarStyled.SDheader}>
                <Link to="/mypage" style={{textDecoration:"none", color: "black"}}><h2 style={{paddingBottom: "1rem"}}>👤 마이페이지</h2></Link>
                <p><strong>{userData.username}님</strong></p>
            </div>
            <div className={sidebarStyled.menubar}>
                <div className={sidebarStyled.items}>
                    <Link to="/replacePW" style={{textDecoration:"none", color: "black"}}><p>비밀번호 변경</p></Link>
                </div>
                <div className={sidebarStyled.items}>
                <Link to="/checkwriting" style={{textDecoration:"none", color: "black"}}><p>작성한 글 확인</p></Link>
                </div>
                <div className={sidebarStyled.items}>
                    <Link to="/myexercisediary" style={{textDecoration:"none", color: "black"}}><p>나의 운동 다이어리</p></Link>
                </div>
                <div className={sidebarStyled.items}>
                    <Link to="/unregister" style={{textDecoration:"none", color: "black"}}><p>회원 탈퇴</p></Link>
                </div>
            </div>
        </div>
    );
}
export default Sidebar