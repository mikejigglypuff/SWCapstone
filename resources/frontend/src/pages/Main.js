import React from "react";
import { useState } from "react";
import "../css/main.css";

const Main = () => {
    return (
        <div className="Main">
            <div className="video">
                <iframe width="70%" height="500vh" src="https://www.youtube.com/embed/BIEezW7aPRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard_summ-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div><br></br>
            <div className="enjoySpace">
                <div className="choiceHealthArea">
                    <h3>&lt;오.운.추(오늘의 운동 추천)&gt;</h3>
                    <p>오늘 운동은 <strong style={{color: "navy"}}>등</strong> 각입니다.</p>
                    <button>아니! 다른 운동 부위 할 건데</button>
                </div>
                <div className="calBMIArea">
                    <div className="CgridItems">
                        <h3>&lt;간단한 BMI 측정하기&gt;</h3>
                    </div>
                    <div className="CgridItems">
                        <label htmlFor="height">키 입력 : </label>
                        <input 
                            id="height"
                            placeholder="당신의 키를 입력하세요"
                            // value={}
                            // onChange={}
                        /><br/>
                        <label htmlFor="weight">몸무게 입력 : </label>
                        <input 
                            id="weight"
                            placeholder="당신의 몸무게를 입력하세요"
                            // value={}
                            // onChange={}
                        />
                    </div>
                    <div className="CgridItems">
                        <button>BMI 계산</button>
                    </div>
                    <div className="CgridItems">
                        <p>당신은 정상입니다</p>
                    </div>
                </div>
            </div>
            <div className="showBoardTableArea">
                <div className="boards">
                    <div className="boardsHeader">
                        <h3>👥 자유 게시판</h3>
                        <button>+</button>
                    </div>
                    <hr />
                    <p>자유 게시판 제목 1</p>
                    <p>자유 게시판 제목 2</p>
                    <p>자유 게시판 제목 3</p>
                </div>
                <div className="boards">
                    <div className="boardsHeader">
                        <h3>🍴 식단 & 운동 공유 게시판</h3>
                        <button>+</button>
                    </div>
                    <hr />
                    <p>식단 & 운동 공유 게시판 제목 1</p>
                    <p>식단 & 운동 공유 게시판 제목 2</p>
                    <p>식단 & 운동 공유 게시판 제목 3</p>
                </div>
                <div className="boards">
                    <div className="boardsHeader">
                        <h3>📢 공지 게시판</h3>
                        <button>+</button>
                    </div>
                    <hr />
                    <p>공지 게시판 제목 1</p>
                    <p>공지 게시판 제목 2</p>
                    <p>공지 게시판 제목 3</p>
                </div>
                <div className="boards">
                    <div className="boardsHeader">
                        <h3>🌏 헬스장 찾기</h3>
                        <button>+</button>
                    </div>
                    <hr />
                    <div style={{textAlign:"center"}}>
                        <img style={{witdh:"100%", height:"30vh"}} src="https://bigdata.changwon.go.kr/portal/img/map/jpg/map_changwon_2022.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main