import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import nreplaceStyled from "../css/nreplacePW.module.css"

const NReplace = () => {

    const [password, setPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");

    const [pwMessage, setPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");

    const [ispw, setIsPw] = useState(false);
    const [ischeckpw, setIsCheckPw] = useState(false);

    // 비밀번호 유효성 검사 함수
    const onPassWordChange = (e) => {
        const currentPW = e.target.value;
        setPassword(currentPW);
        const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,18}$/;// 비밀번호 조건식
        if(!PasswordReg.test(currentPW)){
            setPwMessage("비밀번호는 최소 하나의 문자와 숫자 그리고 하나의 특수 문자를 포함한 8자 이상 18자 이하여야 합니다.");
            setIsPw(false);
        }// 비밀번호 조건식과 입력한 값이 일치하지 않은 경우
        else{
            setPwMessage("이 비밀번호를 사용할 수 있습니다.");
            setIsPw(true);
        }// 비밀번호 조건식과 입력한 값이 일치한 경우
    }  

    // 비밀번호 확인 유효성 검사 부분
    const onChangePassWordCheck = (e) => {
        const currenCheckPW = e.target.value;
        setCheckPassword(currenCheckPW);
        if(password !== currenCheckPW){
            setCheckPwMessage("비밀번호가 일치하지 않습니다.");
            setIsCheckPw(false);
        }
        else{
            setCheckPwMessage("비밀번호가 일치합니다.");
            setIsCheckPw(true);
        }
    }

    const navigate = useNavigate();

    const changePWbyNLogin = async() => {
        try{
                if (ispw === false){
                    alert("비밀번호 조건이 일치하지 않습니다");
                    return;
                }
                else if (ischeckpw === false){
                    alert("비밀번호와 비밀번호 확인의 비밀번호가 일치하지 않습니다.");
                    return;
                }   
                const changePWToken = localStorage.getItem('changePW-token');

                const response = await axios.patch('https://www.healthintalk.net/replacePW', 
                {
                    "pw": password
                },
                {
                    headers: {
                        authorization : `${changePWToken}`
                    }
                });
                alert("비밀번호 변경이 완료되었습니다.")
                localStorage.removeItem('changePW-token');
                navigate('/login');
        }catch(error){
            console.error("좋아요 버튼 처리 도중 에러 발생", error);
        }
    }

    return(
        <div className={nreplaceStyled.NReplacePW}> 
            <div className={nreplaceStyled.NRPtitle}>
                <img src="src=/static/img/logo.png"/>
                <p>비밀번호 변경</p>
            </div>
            <div className={nreplaceStyled.ChangePWArea}>
                <label>변경할 비밀번호</label>
                <input
                    id={password}
                    type="password"
                    placeholder="변경할 비밀번호를 입력해주세요"
                    value={password}
                    onChange={onPassWordChange}
                    
                />
                <p style={{color: ispw === false ? "red" : "green", marginLeft:"8rem"}}>{pwMessage}</p>
                <label>변경할 비밀번호 확인</label>
                <input
                    id={checkpassword}
                    type="password"
                    placeholder="변경할 비밀번호를 다시 한번 입력해주세요"
                    value={checkpassword}
                    onChange={onChangePassWordCheck}
                    
                />
                 <p style={{color: ischeckpw === false ? "red" : "green", marginLeft:"8rem"}}>{checkpwMessage}</p>
            </div>
            <div className={nreplaceStyled.NRPbtnArea}>
                <button onClick={changePWbyNLogin}>비밀번호 변경</button>
            </div>
        </div>
    );
}
export default NReplace