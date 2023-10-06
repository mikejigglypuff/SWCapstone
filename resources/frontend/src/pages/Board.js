import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import boardStyle from "../css/board.module.css"

const Board = () => {
    const dummydata = [
        {
            id: 1,
            title: "안녕하세요",
            date: "4/23",
            viewNum: 5,
            recommendNum: 8
        },
        {
            id: 2,
            title: "반갑습니다",
            date: "5/1",
            viewNum: 7,
            recommendNum: 11
        },
        {
            id: 3,
            title: "헬스란 무엇인가요",
            date: "5/8",
            viewNum: 10,
            recommendNum: 30
        },
    ]

    const {category} = useParams();

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
            {dummydata.map((item) => (
                <div key={item.id} className={boardStyle.showBoardInfo}>
                    <div className={boardStyle.infos}><p>{item.id}</p></div>
                    <div className={boardStyle.infos}><p>{item.title}</p></div>
                    <div className={boardStyle.infos}><p>{item.date}</p></div>
                    <div className={boardStyle.infos}><p>{item.viewNum}</p></div>
                    <div className={boardStyle.infos}><p>{item.recommendNum}</p></div>
                </div>
            ))}
        </div>
    );
}
export default Board