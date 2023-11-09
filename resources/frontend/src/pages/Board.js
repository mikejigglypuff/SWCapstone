import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import boardStyle from "../css/board.module.css"

const Board = () => {

    const [boardDatas, setBoardDatas] = useState([]);
    const [datas, setDatas] = useState([]);
    const {category} = useParams();
    
    useEffect(()=>{
        fetchBoardData();
    },[category]);

    const fetchBoardData = async() => {
        try{
            const responses = await axios.get(`/board/${category}`);
            const response = await axios.get("https://jsonplaceholder.typicode.com/users")
            setBoardDatas(responses.data);
            setDatas(response.data);
            console.log(responses);
            console.log(response);
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
                <div className={boardStyle.items}><p>조회수</p></div>
                <div className={boardStyle.items}><p>추천수</p></div>                                                
            </div>
            {/* {boardDatas && boardDatas.length > 0 ? (
                boardDatas.map((item, i) => (
                    <div key={item.post_id} className={boardStyle.showBoardInfo}>
                        <div className={boardStyle.infos}><p>{item[i].post_id}</p></div>
                        <div className={boardStyle.infos}><p>{item[i].title}</p></div>
                        <div className={boardStyle.infos}><p>{item[i].content}</p></div>
                        <div className={boardStyle.infos}><p>{item[i].user_id}</p></div>
                        <div className={boardStyle.infos}><p>{item[i].favcnt}</p></div>
                    </div>
                ))
            ) : (
                <p>Loading...</p> // 또는 로딩 중을 나타내는 다른 UI 요소를 여기에 추가할 수 있습니다.
            )}       */}
            <div>
                {datas && datas.length > 0 ? (
                    datas.map((it) => (
                        <Link to='/board/:category/writeboard' key={it.id}>
                            <p>{it.name}</p>
                            <p>{it.username}</p>
                        </Link>
                    ))
                ) : (
                    <p>Loading...</p> // 또는 로딩 중을 나타내는 다른 UI 요소를 여기에 추가할 수 있습니다.
                )}
            </div>
            {/* <div>
                {boardDatas && boardDatas.length > 0 ? (
                    boardDatas.map((item) => (
                        <Link to='/board/:category/writeboard' key={item.post_id}>
                            <p>{item.post_id}</p>
                            <p>{item.title}</p>
                            <p>{item.content}</p>
                            <p>{item.user_id}</p>
                            <p>{item.favcnt}</p>
                        </Link>
                    ))
                ) : (
                    <p>Loading...</p> // 또는 로딩 중을 나타내는 다른 UI 요소를 여기에 추가할 수 있습니다.
                )}
            </div> */}
        </div>
    );
}
export default Board