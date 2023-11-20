import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import boardStyle from "../css/board.module.css"

const Board = () => {

    const [boardDatas, setBoardDatas] = useState([]);
    const {category} = useParams();
    
    useEffect(()=>{
        fetchBoardData();
    },[category]);

    const fetchBoardData = async() => {
        try{
            const responses = await axios.get(`/board/${category}`);
            setBoardDatas(responses.data);
            console.log(responses);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

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
                <div className={boardStyle.items}><p>작성자</p></div>
                <div className={boardStyle.items}><p>추천수</p></div>                                                
            </div>
            {boardDatas && boardDatas.length > 0 ? (
                boardDatas.map((item, i) => (
                    <Link to={`showtext/${item.post_id}`} style={{textDecoration:"none", color: "black"}}>
                        <div key={item.post_id} className={boardStyle.showBoardInfo}>
                            <div className={boardStyle.infos}><p>{i + 1}</p></div>
                            <div className={boardStyle.infos}><p>{item.title}</p></div>
                            <div className={boardStyle.infos}><p>{item.createdAt}</p></div>
                            <div className={boardStyle.infos}><p>{item.user_id}</p></div>
                            <div className={boardStyle.infos}><p>{item.favcnt}</p></div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading...</p> // 또는 로딩 중을 나타내는 다른 UI 요소를 여기에 추가할 수 있습니다.
            )}      
            
        </div>
    );
}
export default Board