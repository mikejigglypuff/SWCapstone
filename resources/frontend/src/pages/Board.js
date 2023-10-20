import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import boardStyle from "../css/board.module.css"

const Board = () => {

    const [boardDatas, setBoardDatas] = useState([]);
    const {category} = useParams();
    
    useEffect(()=>{
        const fetchBoardData = async() => {
            try{
                const response = await axios.get(`/board/?category=${category}`); 
                setBoardDatas(response.data.post);
                console.log(response);
            }catch(error){
                console.error("보드 정보를 가져오는 도중 에러 발생", error);
            }
        };

        fetchBoardData();
    },[]);

    return(
        <div className={boardStyle.Board}>
            <div className={boardStyle.Btitle}>
                <h2>{category}</h2>
                <Link to="writeboard"><button>📝 글 쓰기</button></Link>
            </div>
            <div className={boardStyle.boardIntro}>
                <div className={boardStyle.items}><p>번호</p></div>
                <div className={boardStyle.items}><p>제목</p></div>
                <div className={boardStyle.items}><p>날짜</p></div>
                <div className={boardStyle.items}><p>조회수</p></div>
                <div className={boardStyle.items}><p>추천수</p></div>                                                
            </div>
            {boardDatas.map((boardData) => (
                <div key={boardData.id} className={boardStyle.showBoardInfo}>
                    <div className={boardStyle.infos}><p>{boardData.post_id}</p></div>
                    <div className={boardStyle.infos}><p>{boardData.title}</p></div>
                    <div className={boardStyle.infos}><p>{boardData.createdAt}</p></div>
                    <div className={boardStyle.infos}><p>{boardData.user_id}</p></div>
                    <div className={boardStyle.infos}><p>{boardData.favcnt}</p></div>
                </div>
            ))}
        </div>
    );
}
export default Board