import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import checkwritingStyled from "../css/checkwriting.module.css";

const CheckWriting = () => {
    
    const[writingData, setWritingData] = useState([]);

    useEffect(() => {
        fetchWritingText();
    },[]);

    const fetchWritingText = async() => {
        try{
            const response = await axios.get('https://healthintalk.duckdns.org/user/post');
            setWritingData(response.data);
            console.log(response);
        }catch(error){
            console.error("댓글 정보를 가져오는 도중 에러 발생", error);
        }
    } 

    return(
        <div className={checkwritingStyled.CheckWriting}>
            <Sidebar />
            <div className={checkwritingStyled.showWritingList}>
                <div className={checkwritingStyled.CWheader}>
                    <img src="/static/img/logo.png" />
                    <p>작성한 글 확인</p>
                </div>
                <div className={checkwritingStyled.writingListTitle}>
                    <div className={checkwritingStyled.titleItems}><p>카테고리</p></div>
                    <div className={checkwritingStyled.titleItems}><p>제목</p></div>
                    <div className={checkwritingStyled.titleItems}><p>작성일</p></div>
                    <div className={checkwritingStyled.titleItems}><p>추천수</p></div>
                </div>
                {writingData.map((item) => (
                    <div key={item.post_id} className={checkwritingStyled.writingList}>
                        <div className={checkwritingStyled.infos}><p>{item.category}</p></div>
                        <div className={checkwritingStyled.infos}><p>{item.title}</p></div>
                        <div className={checkwritingStyled.infos}><p>{item.createdAt}</p></div>
                        <div className={checkwritingStyled.infos}><p>{item.favcnt}</p></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CheckWriting