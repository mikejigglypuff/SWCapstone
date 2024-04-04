import React, { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import writeboardStyled from "../css/writeboard.module.css"

const WriteBoard = () => {
    const [textTitle, setTextTitle] = useState("");
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onTextTitleChange = (e) => {
        console.log(e.target.value);
        setTextTitle(e.target.value);
    };
    
    const onTextChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
        setPhoto(selectedPhoto);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(selectedPhoto);
        }
    };

    const {category} = useParams();

    const navigate = useNavigate();

    const sendingWriteTextData = async(e) => {
        e.preventDefault();
        
        try {
                const formData = new FormData();
                formData.append('title', textTitle);
                formData.append('content', text);
                formData.append('category', category);
                formData.append('image', photo);

                const response = await axios.post('https://www.healthintalk.net/post', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });
        
                alert("글 작성이 완료되었습니다.");
                navigate(`/board/${category}`)
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return (
        <div className={writeboardStyled.WriteBoard}>
            <div className={writeboardStyled.WBtitle}>
                <h2>게시물 작성 📝</h2>
            </div>
            <form enctype="multipart/form-data" onSubmit={sendingWriteTextData}>
                <div className={writeboardStyled.choiceBoardKindArea}>
                    <label>게시판 종류</label>
                    <span>{category}</span>
                </div>
                <div className={writeboardStyled.enterTitleArea}>
                    <label htmlFor="textTitle">제목</label>
                    <input
                        id = "textTitle"
                        placeholder="글 제목을 입력하세요"
                        value={textTitle}
                        onChange={onTextTitleChange}
                    />
                </div>
                <div className={writeboardStyled.enterTextArea}>
                    <label htmlFor="enterText">내용</label>
                    <textarea
                        id="enterText"
                        placeholder="내용을 입력하세요"
                        value={text}
                        onChange={onTextChange}
                    />
                </div>
                <div className={writeboardStyled.enterImgArea}>
                    <label>이미지 추가하기</label>
                    <input 
                        type="file" 
                        accept='image/*'
                        onChange={handlePhotoChange} 
                    />
                </div><br/>
                <div className={writeboardStyled.WBbtnArea}>
                    <button type="submit">작성</button>
                    <Link to={`/board/${category}`}><button style={{width: "100%"}}>취소</button></Link>
                </div>
            </form>
        </div>
    );
}
export default WriteBoard