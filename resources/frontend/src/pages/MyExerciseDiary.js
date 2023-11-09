import React from "react";
import Sidebar from "../components/Sidebar";
import mydiaryStyled from "../css/myexercisediary.module.css" 

const MyExerciseDiary = () => {
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
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>몸무게</label>
                        <input
                            id="weight"
                            placeholder="몸무게 입력"
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>체지방량</label>
                        <input
                            id="BodyFatPercentage"
                            placeholder="체지방량 입력"
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>골격근량</label>
                        <input
                            id="SkeletalMuscleMass"
                            placeholder="골격근량 입력"
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <label>운동부위</label>
                        <input
                            id="bodyparts"
                            placeholder="운동부위 입력"
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <textarea 
                            id="comment"
                            placeholder="느낀점을 50자 이내로 작성해주세요"
                            maxlength="50"
                            // value={}
                            // onChange={} 
                        />
                    </div>
                    <div className={mydiaryStyled.items}>
                        <button>작성한 일기 등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyExerciseDiary