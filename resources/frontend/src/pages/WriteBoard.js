import React, { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import writeboardStyled from "../css/writeboard.module.css"

const WriteBoard = () => {
    const [textTitle, setTextTitle] = useState("");
    const [text, setText] = useState("");

    const onTextTitleChange = (e) => {
        console.log(e.target.value);
        setTextTitle(e.target.value);
    };
    
    const onTextChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
    };

    const {category} = useParams();

    const navigate = useNavigate();

    const sendingWriteTextData = async() => {
        try {    
                const response = await axios.post('https://healthintalk.duckdns.org/post', {
                    "title": textTitle,
                    "content": text,
                    "category": category
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
            <div className={writeboardStyled.WBbtnArea}>
                <button onClick={sendingWriteTextData}>작성</button>
                <Link to={`/board/${category}`}><button style={{width: "100%"}}>취소</button></Link>
            </div>
        </div>
    );
}
export default WriteBoard