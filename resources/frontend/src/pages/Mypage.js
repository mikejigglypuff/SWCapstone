import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import mypageStyled from "../css/mypage.module.css";

const Mypage = () => {

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
        <div className={mypageStyled.Mypage}>
            <Sidebar />
            <div className={mypageStyled.showMyInfo}>
                <div className={mypageStyled.MPtitle}>
                    <img src="/static/img/logo.png" />
                    <p>회원정보</p>
                </div>
                <div className={mypageStyled.myInfo}>
                    <p style={{color: "navy"}}>닉네임</p>
                    <p>{userData.username}</p>
                    <p style={{color: "navy"}}>아이디</p>
                    <p>{userData.user_id}</p>
                    <p style={{color: "navy"}}>이메일</p>
                    <p>{userData.email}</p>
                    <p style={{color: "navy"}}>가입일</p>
                    <p>{userData.createdAt}</p>
                </div> 
            </div>
        </div>
    );
}
export default Mypage