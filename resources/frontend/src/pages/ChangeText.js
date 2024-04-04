import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import changetextStyled from "../css/changetext.module.css";

const ChangeText = () => {

    const [editTitle, setEditTitle] = useState("");
    const [editText, setEditText] = useState("");
    const [editImage, setEditImage] = useState([]);
    const {post_id} = useParams();
    const {category} = useParams();

    // 기존 작성 글 데이터 불러오는 함수
    useEffect(() => {
        fetchBeforeTextData()
    },[]);

    const fetchBeforeTextData = async() => {
        try{
            const response = await axios.get(`https://healthintalk.net/post/${post_id}`);
            setEditTitle(response.data.title);
            setEditText(response.data.content);
            console.log(response);
        }catch(error){
            console.error("기존에 작성한 글을 가져오는 도중 에러 발생", error);
        }
    };

    const navigate = useNavigate();

    //수정된 제목 또는 글 내용 전달 함수
    const editNewTextData = async(e) => {
        e.preventDefault();

        try{
                const formData = new FormData();
                formData.append('id', post_id);
                formData.append('title', editTitle);
                formData.append('content', editText);
                formData.append('image', editImage);

                const response = await axios.patch('https://healthintalk.net/post', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
            });
            alert("게시글 수정이 완료되었습니다.");
            navigate(`/board/${category}/showtext/${post_id}`);
        }catch(error){
            console.error("게시글 수정 정보 처리 도중 에러 발생", error);
        }
    }

    const onEditTitleChange = (e) => {
        console.log(e.target.value);
        setEditTitle(e.target.value);
    };
    
    const onEditTextChange = (e) => {
        console.log(e.target.value);
        setEditText(e.target.value);
    };

    const onEditPhotoChange = (e) => {
        setEditImage(e.target.files[0]);
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
        setEditImage(selectedPhoto);
        }
    };

    return(
        <div className={changetextStyled.ChangeText}>
            <div className={changetextStyled.CTheader}>
                <h2>🖋 게시물 수정하기 🖋</h2>
            </div>
            <form enctype="multipart/form-data" onSubmit={editNewTextData}>
                <div className={changetextStyled.EditArea}>
                    <div className={changetextStyled.EditTitleArea}>
                        <label htmlFor="editTitle">수정하고 싶은 제목 입력</label>
                        <input 
                            id="editTitle" 
                            type="text"
                            value={editTitle} 
                            onChange={onEditTitleChange}
                        />
                    </div>
                    <div className={changetextStyled.EditTextArea}>
                        <label htmlFor="editText">수정하고 싶은 내용 입력</label>
                        <textarea id="editText" 
                            value={editText} 
                            onChange={onEditTextChange}
                        />
                    </div>
                    <div className={changetextStyled.EditImageArea}>
                        <label htmlFor="editImage">수정하고 싶은 사진 변경</label>
                        <input 
                            id="editImage" 
                            type="file"
                            onChange={onEditPhotoChange}
                        />
                    </div>
                </div>
                <div className={changetextStyled.btnArea}>
                    <button type="submit">게시글 수정하기</button>
                    <Link to={`/board/${category}/showtext/${post_id}`}><button style={{width:"100%"}}>취소</button></Link>
                </div>
            </form>
        </div>
    );
}
export default ChangeText;