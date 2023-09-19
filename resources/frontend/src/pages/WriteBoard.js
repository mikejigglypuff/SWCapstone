import React from "react"
import "../css/writeboard.css"

const WriteBoard = () => {
    return (
        <div className="WriteBoard">
            <div className="WBtitle">
                <h2>게시물 작성 📝</h2>
            </div>
            <div className="choiceBoardKindArea">
                <label>게시판 종류 선택</label>
                <select>
                    <option value="자유게시판">자유게시판</option>
                    <option value="식단&운동 공유 게시판">식단&운동 공유 게시판</option>
                    <option value="공지게시판">공지게시판</option>
                </select>
            </div>
            <div className="enterTitleArea">
                <label htmlFor="textTitle">제목</label>
                <input
                    id = "textTitle"
                    placeholder="글 제목을 입력하세요"
                    // value={}
                    // onChange={}
                />
            </div>
            <div className="enterTextArea">
                <label htmlFor="enterText">내용</label>
                <textarea
                    id="enterText"
                    placeholder="내용을 입력하세요"
                    // value={}
                    // onChange={}
                />
            </div>
            <div className="WBbtnArea">
                <button>작성</button>
                <button>취소</button>
            </div>
        </div>
    );
}
export default WriteBoard