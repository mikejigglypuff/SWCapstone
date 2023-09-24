import React from "react";
import { useState, useEffect } from "react";
import "../css/ounchu.css"

const Ounchu = () => {
    const [parts, setParts] = useState(null);

    //초기에 랜더링 시 로컬 스토리지에 운동 부위들을 넣기 위한 useeffect 사용
    useEffect(() => {
        const bodyPart = ["등", "가슴", "어깨", "팔", "하체"];
        localStorage.setItem("bodyParts", JSON.stringify(bodyPart));
    }, []);

    // 버튼 클릭 시 운동 부위를 랜덤으로 설정할 수 있도록 함
    const onOUHbtnClick = () => {
        let num;
        let undong, checkUndong;
        num = Math.floor(Math.random() * 5); //배열의 랜덤 값을 넣기 위한 변수

        if(localStorage.getItem('bodyParts') == null){
            undong = [];
        }
        else{
            undong = JSON.parse(localStorage.getItem('bodyParts'));
        }
        checkUndong = undong[num];
        setParts(checkUndong); // 위에서 랜덤으로 구한 것의 부위를 usestate를 통해 넣음
    }
    
    return(
        <div className="Ounchu">
            <h3>&lt;오.운.추(오늘의 운동 추천)&gt;</h3>
            <p>오늘 운동은 <strong style={{color: "navy"}}>{parts === null ? "등" : parts}</strong> 각입니다.</p>
            <button onClick={onOUHbtnClick}>아니! 다른 운동 부위 할 건데</button>
        </div>
    );
}
export default Ounchu