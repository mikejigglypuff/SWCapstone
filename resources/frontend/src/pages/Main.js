import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BMIs from "../components/BMIs";
import Ounchu from "../components/Ounchu";
import mainStyled from "../css/main.module.css";

const Main = () => {
    const[height, setHeight] = useState("");
    const[weight, setWeight] = useState("");
    const[bmi, setBMI] = useState(null);

    const[free, setFree] = useState([]);
    const[share, setShare] = useState([]);
    const[question, setQuestion] = useState([]);

    const changeHeightEvent = (e) => {
        setHeight(e.target.value);
        setBMI(null);
    };
    
    const changeWeightEvent = (e) => {
        setWeight(e.target.value);
        setBMI(null);
    };

    const calcBMI = () => {
        const calBMI = (weight/(Math.pow(height, 2)/10000)).toFixed(2);
        setBMI(calBMI);
        setHeight("");
        setWeight("");
    }

    useEffect(()=>{
        fetcFreeBoardData();
    },[]);

    const fetcFreeBoardData = async() => {
        try{
            const responses = await axios.get('/board/자유게시판');
            setFree(responses.data);
            console.log(responses);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    useEffect(()=>{
        fetchShareBoardData();
    },[]);

    const fetchShareBoardData = async() => {
        try{
            const responses = await axios.get('/board/식단&운동공유게시판');
            setShare(responses.data);
            console.log(responses);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    useEffect(()=>{
        fetchBoardData();
    },[]);

    const fetchBoardData = async() => {
        try{
            const responses = await axios.get('/board/질문게시판');
            setQuestion(responses.data);
            console.log(responses);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    return (
        <div className={mainStyled.Main}>
            <div className={mainStyled.video}>
                <iframe width="82%" height="500vh" src="https://www.youtube.com/embed/BIEezW7aPRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard_summ-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div><br></br>
            <div className={mainStyled.enjoySpace}>
                <div className={mainStyled.choiceHealthArea}>
                   <Ounchu />
                </div>
                <div className={mainStyled.calBMIArea}>
                    <div className={mainStyled.CgridItems}>
                        <h3>&lt;간단한 BMI 계산하기&gt;</h3>
                    </div>
                    <div className={mainStyled.CgridItems}>
                        <label htmlFor="height">키 입력 : </label>
                        <input 
                            id="height"
                            placeholder="당신의 키를 입력하세요"
                            value={height}
                            onChange={changeHeightEvent}
                        /><br/>
                        <label htmlFor="weight">몸무게 입력 : </label>
                        <input 
                            id="weight"
                            placeholder="당신의 몸무게를 입력하세요"
                            value={weight}
                            onChange={changeWeightEvent}
                        />
                    </div>
                    <div className={mainStyled.CgridItems}>
                        <button onClick={calcBMI}>BMI 계산</button>
                    </div>
                    <div className={mainStyled.CgridItems}>
                        <p>{bmi === null ? "키와 몸무게를 입력해주세요" : <BMIs calcingBMI={bmi}/> }</p>
                    </div>
                </div>
            </div>
            <div className={mainStyled.showBoardTableArea}>
                <div className={mainStyled.boards}>
                    <div className={mainStyled.boardsHeader}>
                        <h3>👥 자유 게시판</h3>
                        <Link to="board/자유게시판"><button>+</button></Link>
                    </div>
                    <hr />
                    {
                        free.map((item) => (
                            <Link to={`board/자유게시판/showtext/${item.post_id}`} style={{textDecoration:"none", color: "black"}}>
                                <div className={mainStyled.showTexts}>
                                    <p>{item.title}</p>
                                    <p>{item.createdAt}</p>                               
                                </div>
                            </Link>
                    ))}
                </div>
                <div className={mainStyled.boards}>
                    <div className={mainStyled.boardsHeader}>
                        <h3>🍴 식단 & 운동 공유 게시판</h3>
                        <Link to="board/식단&운동공유게시판"><button>+</button></Link>
                    </div>
                    <hr />
                    {
                        share.map((item) => (
                            <Link to={`board/식단&운동공유게시판/showtext/${item.post_id}`} style={{textDecoration:"none", color: "black"}}>
                                <div className={mainStyled.showTexts}>
                                    <p>{item.title}</p>
                                    <p>{item.createdAt}</p>                                
                                </div>
                            </Link>
                    ))}
                </div>
                <div className={mainStyled.boards}>
                    <div className={mainStyled.boardsHeader}>
                        <h3>📢 질문 게시판</h3>
                        <Link to="board/질문게시판"><button>+</button></Link>
                    </div>
                    <hr />
                    {
                        question.map((item) => (
                            <Link to={`board/질문게시판/showtext/${item.post_id}`} style={{textDecoration:"none", color: "black"}}>
                                <div className={mainStyled.showTexts}>
                                    <p>{item.title}</p>
                                    <p>{item.createdAt}</p>                                
                                </div>
                            </Link>
                    ))}
                </div>
                <div className={mainStyled.boards}>
                    <div className={mainStyled.boardsHeader}>
                        <h3>🌏 헬스장 찾기</h3>
                        <Link to="/searchfitnesscenter"><button>+</button></Link>
                    </div>
                    <hr />
                    <div style={{textAlign:"center"}}>
                        <img style={{witdh:"100%", height:"30vh"}} src="/static/img/DankookUniv.png" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main