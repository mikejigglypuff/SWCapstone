import React from "react";
import { useState } from "react";
import showtextStyled from "../css/showtext.module.css"
import axios from "axios";

const ShowText = () => {
    const [comment, setComment] = useState("");

    const onCommentChange = (e) => {
        setComment(e.target.value);
        console.log(e.target.value);
    }

    // const sendInputComment = async() => {
    //     try {    
    //             const response = await axios.post('/post', {
    //                 "title": textTitle,
    //                 "content": text,
    //                 "category": category
    //             });
        
    //             alert("글 작성이 완료되었습니다.");
    //             navigate(`/board/${category}`)
    //       } catch (error) {
    //         console.error('Error sending data:', error);
    //       }
    // }

    return (
        <div className={showtextStyled.ShowText}>
            <h2>게시글 제목</h2>
            <div className={showtextStyled.showTextInfo}>
                <p>작성자: <span>xxx</span></p>
                <p>글 작성일: <span>2023년 xx월 xx일</span></p>
                <p>조회 수: <span>xx회</span></p>
                <p>추천 수: <span>xx개</span></p>
            </div>
            <div className={showtextStyled.mainShowTextArea}>
                <div className={showtextStyled.showTextBox}></div>
                <button><img src="img/thumbsup.jpg"></img>추천</button>
            </div>
            <div className={showtextStyled.commentArea}>
                <h3>댓글 <span>N</span></h3>
                <div className={showtextStyled.inputCommentArea}>
                    <input
                        id="comment"
                        placeholder="댓글을 입력하세요"
                        // value={}
                        // onChange={}
                    />
                    <button>입력</button>
                </div>
                <div className={showtextStyled.showCommentArea}>
                    <p>사용자 이름</p>
                    <p>댓글 내용</p>
                </div>
            </div>
        </div>
    );
}
export default ShowText 