import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import showtextStyled from "../css/showtext.module.css"
import axios from "axios";

const ShowText = () => {
    const [comment, setComment] = useState("");
    const [beforeComments, setBeforeComments] = useState([]);
    const [textData, setTextData] = useState([]);
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [commentId, setCommentId] = useState(0)
    const [isWriter, setIsWriter] = useState(false);
    const [isCommentWriter, setIsCommentWriter] = useState(false);
    const [imgurl, setImgurl] = useState([]);
    const [images, setImages] = useState([]);
    const {post_id} = useParams(); // useParams 사용 시 app.js에서 설정한 변수 이름이랑 맞춰야함 아니면 받아오지 못함
    const {category} = useParams();

    const uID = localStorage.getItem('usersId');

    // 댓글 입력 및 댓글 서버 전송 부분
    const onCommentChange = (e) => {
        setComment(e.target.value);
        console.log(e.target.value);
    }

    const sendInputComment = async() => {
        try {    
                const response = await axios.post('https://healthintalk.duckdns.org/comment', {
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
            const response = await axios.get(`https://healthintalk.duckdns.org/comment/${post_id}`);
            setBeforeComments(response.data);
            const cwriter = localStorage.getItem('usersId');
            if(cwriter === response.data.user_id){
                setIsCommentWriter(true);
            }
            else{
                setIsCommentWriter(false);
            }
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
            const response = await axios.get(`https://healthintalk.duckdns.org/post/${post_id}`);
            setTextData(response.data);
            setImgurl(response.data.url);
            const writer = localStorage.getItem('usersId');
            if(writer === response.data.user_id){
                setIsWriter(true);
            }
            else{
                setIsWriter(false);
            }
            console.log(response);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    // 좋아요 버튼 클릭 시 함수
    const clickLikeBtn = async() => {
        try{
            const response = await axios.patch('https://healthintalk.duckdns.org/post', {
                "id": post_id,
                "favcnt": true
            });
            fetchTextData();
        }catch(error){
            console.error("좋아요 버튼 처리 도중 에러 발생", error);
        }
    };

    const navigate = useNavigate();
    
    //게시물 삭제 함수
    const deleteText = async() => {
        const respose = await axios.delete(`https://healthintalk.duckdns.org/post/${post_id}`);
        alert('게시물이 삭제되었습니다.');
        navigate(`/board/${category}`);
    };
    
    //수정 예정인 댓글 선택 함수
    const isEditBtnClicking = (id) => {
        setCommentId(id);
        setIsEditBtnClicked(true);
    }

    // 댓글 수정 관련 함수
    const onEditCommentChange = (e) => {
        setEditComment(e.target.value);
        console.log(e.target.value);
    }

    // 수정하기 버튼 클릭 시
    const clickEditCommentBtn = async() => {
        try{
            const response = await axios.patch('https://healthintalk.duckdns.org/comment', {
                "commentId": commentId,
                "content": editComment
            });
            alert("댓글 수정이 완료되었습니다.");
            setIsEditBtnClicked(false);
            fetchComment();
        }catch(error){
            console.error("댓글 수정 처리 도중 에러 발생", error);
        }
    };

    // 수정 취소 버튼 클릭 시
    const cancelEditComment = () => {
        setIsEditBtnClicked(false);
    }

    //댓글 삭제 버튼 클릭 시
    const deleteComment = async(commentID) => {
        const respose = await axios.delete(`https://healthintalk.duckdns.org/comment/${commentID}`);
        alert('댓글이 삭제되었습니다.');
        fetchComment();
    }

    return (
        <div className={showtextStyled.ShowText}>
            <div className={showtextStyled.titleArea}>
                <h2>{textData.title}</h2>
                {isWriter === true ?
                    <div className={showtextStyled.titleBtnArea}>
                        <Link to="changetext"><button id={showtextStyled.editT}>게시글 수정</button></Link>
                        <button id={showtextStyled.deleteT} onClick={deleteText}>게시글 삭제</button>
                    </div> : <div></div>
                }
            </div>
            <div className={showtextStyled.showTextInfo}>
                <p>작성자: <span>{textData.user_id}</span></p>
                <p>글 작성일: <span>{textData.createdAt}</span></p>
                <p>추천 수: <span>{textData.favcnt}</span></p>
            </div>
            <div className={showtextStyled.mainShowTextArea}>
                <div className={showtextStyled.showTextBox}>
                    <img style={{width: "80%", height:"65vh"}} src={`/img/${imgurl}`}/><br/><br/>
                    {textData.content}
                </div>
                <button onClick={clickLikeBtn}><img src="/static/img/thumbsup.jpg"></img>추천<span>{textData.favcnt}</span></button>
            </div>
            <div className={showtextStyled.commentArea}>
                <h3>댓글 <span>{beforeComments.length}</span></h3>
                <div className={showtextStyled.inputCommentArea}>
                    <input
                        id="comment"
                        placeholder="댓글을 입력하세요"
                        value={comment}
                        onChange={onCommentChange}
                    />
                    <button onClick={sendInputComment}>입력</button>
                </div>
                {beforeComments.map((item, i) => (
                    <div key={item.comment_id} className={showtextStyled.showCommentArea}>
                        <div className={showtextStyled.showCommentAreaHeader}>
                            <p style={{fontWeight:"bold", fontSize: "1.1rem", color:"navy"}}>{item.user_id}</p>
                            <span style={{fontSize: "0.8rem", color:"gray"}}>{item.createdAt}</span>
                        </div>
                        <div className={showtextStyled.showCommentAreaMain}>
                            {commentId === item.comment_id && isEditBtnClicked === true ? 
                                <div className={showtextStyled.editComment}>
                                    <input value={editComment} onChange={onEditCommentChange}/>
                                    <div className={showtextStyled.editCommentBtnArea}>
                                        <button onClick={clickEditCommentBtn}>수정 완료</button>
                                        <button onClick={cancelEditComment}>수정 취소</button>    
                                    </div> 
                                </div>
                                    : <p style={{fontSize: "1rem"}}>{item.content}</p>}
                            {uID === beforeComments[i].user_id ? 
                                <div className={showtextStyled.showCommentAreaMainBtn}>
                                    <button onClick={()=>{isEditBtnClicking(item.comment_id)}}>수정</button>
                                    <span style={{marginLeft: "0.5rem"}}>|</span>
                                    <button onClick={()=>{deleteComment(item.comment_id)}}>삭제</button>
                                </div> : <div className={showtextStyled.showCommentAreaMainBtn}></div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ShowText 