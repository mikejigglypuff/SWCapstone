import React from "react";
import Sidebar from "../components/Sidebar";
import checkwritingStyled from "../css/checkwriting.module.css";

const CheckWriting = () => {
    
    // const dummydata = [
    //     {
    //         id: 1,
    //         category: "자유게시판",
    //         title: "헬스란 무엇인가",
    //         date: "2023년 10월 01일",
    //         recommendNum: 3
    //     },
    //     {
    //         id: 2,
    //         category: "식단&운동공유게시판",
    //         title: "등 운동은 어떻게 해야 할까요?",
    //         date: "2023년 10월 05일",
    //         recommendNum: 9
    //     },
    //     {
    //         id: 3,
    //         category: "공지게시판",
    //         title: "여러분게 알려드릴 것이 있습니다",
    //         date: "2023년 10월 08일",
    //         recommendNum: 4
    //     },
    // ]

    return(
        <div className={checkwritingStyled.CheckWriting}>
            <Sidebar />
            <div className={checkwritingStyled.showWritingList}>
                <div className={checkwritingStyled.CWheader}>
                    <img src="img/logo.png" />
                    <p>작성한 글 확인</p>
                </div>
                <div className={checkwritingStyled.writingListTitle}>
                    <div className={checkwritingStyled.titleItems}><p>카테고리</p></div>
                    <div className={checkwritingStyled.titleItems}><p>제목</p></div>
                    <div className={checkwritingStyled.titleItems}><p>작성일</p></div>
                    <div className={checkwritingStyled.titleItems}><p>추천수</p></div>
                </div>
                {/* {dummydata.map((item) => (
                <div key={item.id} className={checkwritingStyled.writingList}>
                    <div className={checkwritingStyled.infos}><p>{item.category}</p></div>
                    <div className={checkwritingStyled.infos}><p>{item.title}</p></div>
                    <div className={checkwritingStyled.infos}><p>{item.date}</p></div>
                    <div className={checkwritingStyled.infos}><p>{item.recommendNum}</p></div>
                </div>
            ))} */}
            </div>
        </div>
    );
}
export default CheckWriting