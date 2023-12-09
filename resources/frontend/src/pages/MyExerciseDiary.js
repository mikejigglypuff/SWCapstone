import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import mydiaryStyled from "../css/myexercisediary.module.css" 

const MyExerciseDiary = () => {
    
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);
    const [muscle, setMuscle] = useState(0);
    const [bodyParts, setBodyParts] = useState("");
    const [content, setContent] = useState("");

    const[diaryData, setDiaryData] = useState([]);

    const onDateChange = (e) => {
        setDate(e.target.value);
        console.log(e.target.value);
    }
    const onWeightChange = (e) => {
        setWeight(e.target.value);
        console.log(e.target.value);
    }
    const onBodyFatChange = (e) => {
       setBodyFat(e.target.value);
       console.log(e.target.value);
    }
    const onMuscleChange = (e) => {
        setMuscle(e.target.value);
        console.log(e.target.value);
    }
    const onBodyPartsChange = (e) => {
        setBodyParts(e.target.value);
        console.log(e.target.value);
    }
    const onContentChange = (e) => {
        setContent(e.target.value);
        console.log(e.target.value);
    }

    const sendInputDiaryInfo = async() => {
        try {    
                const response = await axios.post('https://healthintalk.duckdns.org/diary', {
                    "date": date,
                    "weight": weight,
                    "bodyFat": bodyFat,
                    "muscle": muscle,
                    "bodyParts": bodyParts,
                    "content": content
                });
                alert("일기 작성이 완료되었습니다.");
                fetchDiaryInfo();
                setWeight("")
                setBodyFat("")
                setMuscle("")
                setBodyParts("")
                setContent("")

          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    useEffect(() => {
        fetchDiaryInfo();
    },[]);

    const fetchDiaryInfo = async() => {
        try{
            const response = await axios.get('https://healthintalk.duckdns.org/diary');
            setDiaryData(response.data);
            console.log(response);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    } 

    return(
        <div className={mydiaryStyled.MyExerciseDiary}>
            <Sidebar />
            <div className={mydiaryStyled.inputDiaryArea}>
                <div className={mydiaryStyled.inputDiaryHeader}>
                    <p id={mydiaryStyled.info}>나의 운동 다이어리</p>
                    <div className={mydiaryStyled.sectors}><p>다이어리 작성</p></div>
                </div>
                <div className={mydiaryStyled.inputDiaryText}>
                    <div className={mydiaryStyled.items}>
                        <input
                            id={mydiaryStyled.date}
                            type="date"
                            value={date}
                            onChange={onDateChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>몸무게</label>
                        <input
                            id="weight"
                            placeholder="몸무게 입력"
                            value={weight}
                            onChange={onWeightChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>체지방량</label>
                        <input
                            id="BodyFatPercentage"
                            placeholder="체지방량 입력"
                            value={bodyFat}
                            onChange={onBodyFatChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>골격근량</label>
                        <input
                            id="SkeletalMuscleMass"
                            placeholder="골격근량 입력"
                            value={muscle}
                            onChange={onMuscleChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>운동부위</label>
                        <input
                            id="bodyparts"
                            placeholder="운동부위 입력"
                            value={bodyParts}
                            onChange={onBodyPartsChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <textarea 
                            id="comment"
                            placeholder="느낀점을 50자 이내로 작성해주세요"
                            maxlength="50"
                            value={content}
                            onChange={onContentChange} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <button onClick={sendInputDiaryInfo}>작성한 일기 등록</button>
                    </div>
                </div><br /><br />
                <div className={mydiaryStyled.showDiaryArea}>
                    <div className={mydiaryStyled.showDiaryHeader}>
                        <div className={mydiaryStyled.sectors}><p>작성한 다이어리 내용</p></div>
                    </div>
                    {
                        diaryData.map((item) => (
                            <div className={mydiaryStyled.showDiary}>
                                <div className={mydiaryStyled.witems}>
                                    <p>{item.date}</p>
                                </div>
                                <div className={mydiaryStyled.witems}>
                                    <p>몸무게</p>
                                    <span>{item.weight}kg</span>
                                </div>
                                <div className={mydiaryStyled.witems}>
                                    <p>체지방량</p>
                                    <span>{item.bodyFat}%</span>
                                </div>
                                <div className={mydiaryStyled.witems}>
                                    <p>골격근량</p>
                                    <span>{item.muscle}%</span>
                                </div>
                                <div className={mydiaryStyled.witems}>
                                    <p>운동 부위</p>
                                    <span>{item.bodyParts}</span>
                                </div>
                                <div className={mydiaryStyled.witems}>
                                    <p>느낀점</p>
                                    <span>{item.content}</span>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default MyExerciseDiary