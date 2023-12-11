import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import replacePWStyled from "../css/replacePW.module.css"

const ReplacePW = () => {
    const [beforePW, setBeforePW] = useState("");
    const [newPW, setNewPW] = useState("");
    const [checkNewPW, setcheckNewPW] = useState("");

    const [newpwMessage, setNewPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");

    const [isnewPW, setIsnewPW] = useState(false);
    const [ischeckNewPW, setIscheckNewPW] = useState(false);

    const onBeforePWChange = (e) =>{
        setBeforePW(e.target.value);
        console.log(e.target.value);
    };
    
     // 비밀번호 유효성 검사 함수
     const onNewPassWordChange = (e) => {
        const currentNewPW = e.target.value;
        setNewPW(currentNewPW);
        const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,18}$/;// 비밀번호 조건식
        if(!PasswordReg.test(currentNewPW)){
            setNewPwMessage("비밀번호는 최소 하나의 문자와 숫자 그리고 하나의 특수 문자를 포함한 8자 이상 18자 이하여야 합니다.");
            setIsnewPW(false);
        }// 비밀번호 조건식과 입력한 값이 일치하지 않은 경우
        else if(beforePW === currentNewPW){
            setNewPwMessage("기존의 비밀번호와 일치합니다.");
            setIsnewPW(false);
        }// 입력한 비밀번호가 기존의 비밀번호와 일치하는 경우
        else{
            setNewPwMessage("이 비밀번호를 사용할 수 있습니다.");
            setIsnewPW(true);
        }// 비밀번호 조건식과 입력한 값이 일치하고 기존의 비밀번호와 일치하지 않는 경우
    }  

    // 비밀번호 확인 유효성 검사 부분
    const onCheckNewPWChange = (e) => {
        const currenCheckNewPW = e.target.value;
        setcheckNewPW(currenCheckNewPW);
        if(newPW !== currenCheckNewPW){
            setCheckPwMessage("비밀번호가 일치하지 않습니다.");
            setIscheckNewPW(false);
        }
        else{
            setCheckPwMessage("비밀번호가 일치합니다.");
            setIscheckNewPW(true);
        }
    }

    const deleteSession = async () => {
        await axios.delete("/logout");
    }

    const navigate = useNavigate();

    const changePassWord = async() => {
        try{
            const response = await axios.patch('https://healthintalk.duckdns.org/user', {
                "pw": beforePW,
                "newPW": newPW
            });
            alert("비밀번호 변경이 완료되었습니다.");
            deleteSession();
            navigate('/login');
        }catch(error){
            console.error("비밀번호 변경 도중 에러 발생", error);
        }
    }

    return (
        <div className={replacePWStyled.ReplacePW}>
            <Sidebar />
            <div className={replacePWStyled.inputArea}>
                <div className={replacePWStyled.RPtitle}>
                    <img src="/static/img/logo.png" id="image" />
                    <p id="title">비밀번호 변경</p>
                </div>
                <div className={replacePWStyled.enterNewPWArea}>
                    <div className={replacePWStyled.enterPW}>
                        <label>현재 비밀번호</label>
                        <input
                            id="presentPW"
                            type="password"
                            placeholder="현재 비밀번호를 입력하세요"
                            value={beforePW}
                            onChange={onBeforePWChange}
                        />
                    </div>
                    <div className={replacePWStyled.enterNewPW}>
                        <label>변경할 비밀번호</label>
                        <input
                            id="changePW"
                            type="password"
                            placeholder="변경할 비밀번호를 입력하세요"
                            value={newPW}
                            onChange={onNewPassWordChange}
                        />
                        <p style={{color: isnewPW === false ? "red" : "green"}}>{newpwMessage}</p>
                    </div>
                    <div className={replacePWStyled.enterNewPW}>
                        <label>변경할 비밀번호 확인</label>
                        <input
                            id="changePW"
                            type="password"
                            placeholder="변경할 비밀번호를 다시 한번 입력하세요"
                            value={checkNewPW}
                            onChange={onCheckNewPWChange}
                        />
                        <p style={{color: ischeckNewPW === false ? "red" : "green"}}>{checkpwMessage}</p>
                    </div>
                    <div className={replacePWStyled.RPbtnArea}>
                        <button onClick={changePassWord}>비밀번호 변경</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReplacePW