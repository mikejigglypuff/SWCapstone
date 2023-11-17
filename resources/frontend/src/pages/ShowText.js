import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import showtextStyled from "../css/showtext.module.css"
import axios from "axios";

const ShowText = () => {
    const [comment, setComment] = useState("");
    const [beforeComments, setBeforeComments] = useState([]);
    const [textData, setTextData] = useState([]);
    const {post_id} = useParams(); // useParams 사용 시 app.js에서 설정한 변수 이름이랑 맞춰야함 아니면 받아오지 못함
    console.log(post_id);

    // 댓글 입력 및 댓글 서버 전송 부분
    const onCommentChange = (e) => {
        setComment(e.target.value);
        console.log(e.target.value);
    }

    const sendInputComment = async() => {
        try {    
                const response = await axios.post('/comment', {
                    "postId": post_id,
                    "content": comment
                });
                alert("댓글 작성이 완료되었습니다.");

                fetchComment();

                setComment("");
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    // 댓글 받아오는 함수
    useEffect(() => {
        fetchComment();
    },[]);

    const fetchComment = async() => {
        try{
            const response = await axios.get(`/comment/${post_id}`);
            setBeforeComments(response.data);
            console.log(response);
        }catch(error){
            console.error("댓글 정보를 가져오는 도중 에러 발생", error);
        }
    } 

    // 게시물 서버로부터 받아오는 부분
    useEffect(() => {
        fetchTextData()
    },[]);

    const fetchTextData = async() => {
        try{
            const response = await axios.get(`/post/${post_id}`);
            setTextData(response.data);
            console.log(response);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    // 좋아요 버튼 클릭 시 함수
    const clickLikeBtn = async() => {
        try{
            const respone = await axios.patch('/post', {
                "id": post_id,
                "favcnt": true
            });
            fetchTextData();
        }catch(error){
            console.error("좋아요 버튼 처리 도중 에러 발생", error);
        }
    }

    return (
        <div className={showtextStyled.ShowText}>
            <h2>{textData.title}</h2>
            <div className={showtextStyled.showTextInfo}>
                <p>작성자: <span>{textData.user_id}</span></p>
                <p>글 작성일: <span>{textData.createdAt}</span></p>
                <p>추천 수: <span>{textData.favcnt}</span></p>
            </div>
            <div className={showtextStyled.mainShowTextArea}>
                <div className={showtextStyled.showTextBox}>{textData.content}</div>
                <button><img src="/static/img/thumbsup.jpg"></img>추천<span>{textData.favcnt}</span></button>
            </div>
            <div className={showtextStyled.commentArea}>
                <h3>댓글 <span>N</span></h3>
                <div className={showtextStyled.inputCommentArea}>
                    <input
                        id="comment"
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={onCommentChange}
                    />
                    <button onClick={sendInputComment}>입력</button>
                </div>
                {beforeComments.map((item) => (
                    <div key={item.comment_id} className={showtextStyled.showCommentArea}>
                        <p style={{fontWeight:"bold", fontSize: "1.1rem", color:"navy"}}>{item.user_id}</p>
                        <p style={{fontSize: "1rem"}}>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ShowText 