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
            const response = await axios.get('/user');
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
                    <img src="img/logo.png" />
                    <p>회원정보</p>
                </div>
                {userData.map((item) => (
                    <div key={item.user_id} className={mypageStyled.myInfo}>
                        <p style={{color: "navy"}}>닉네임</p>
                        <p>{item.username}</p>
                        <p style={{color: "navy"}}>아이디</p>
                        <p>{item.user_id}</p>
                        <p style={{color: "navy"}}>이메일</p>
                        <p>{item.email}</p>
                        <p style={{color: "navy"}}>가입일</p>
                        <p>{item.createdAt}</p>
                    </div> 
                ))} 
            </div>
        </div>
    );
}
export default Mypage