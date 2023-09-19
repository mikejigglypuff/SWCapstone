import React from "react";
import "../css/board.css";

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

    return(
        <div className="Board">
            <div className="Btitle">
                <h2>자유게시판</h2>
                <button>📝 글 쓰기</button>
            </div>
            <div className="boardIntro">
                <div className="items"><p>번호</p></div>
                <div className="items"><p>제목</p></div>
                <div className="items"><p>날짜</p></div>
                <div className="items"><p>조회수</p></div>
                <div className="items"><p>추천수</p></div>                                                
            </div>
            {dummydata.map((item) => (
                <div key={item.id} className="showBoardInfo">
                    <div className="infos"><p>{item.id}</p></div>
                    <div className="infos"><p>{item.title}</p></div>
                    <div className="infos"><p>{item.date}</p></div>
                    <div className="infos"><p>{item.viewNum}</p></div>
                    <div className="infos"><p>{item.recommendNum}</p></div>
                </div>
            ))}
        </div>
    );
}
export default Board