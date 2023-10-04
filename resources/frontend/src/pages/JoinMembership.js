import React from "react";
import axios from "axios"
import { useState } from "react";
import "../css/joinmembership.css"

const JoinMembership = () => {
    const [id, setID] = useState("");
    const [password, setPassword]= useState("");
    const [checkPW, setCheckPw] = useState("");
    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const [pwMessage, setPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");

    const [ispw, setIsPw] = useState(false);
    const [ischeckpw, setIsCheckPw] = useState(false);

    const onIDChange = (e) =>{
        setID(e.target.value);
        console.log(e.target.value);
    };
    
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
    const onCheckPWChange = (e) => {
        const currenCheckPW = e.target.value;
        setCheckPw(currenCheckPW);
        if(password !== currenCheckPW){
            setCheckPwMessage("비밀번호가 일치하지 않습니다.");
            setIsCheckPw(false);
        }
        else{
            setCheckPwMessage("비밀번호가 일치합니다.");
            setIsCheckPw(true);
        }
    }

    const onNameChange = (e) =>{
        setName(e.target.value);
        console.log(e.target.value);
    };

    const onPhoneNumChange = (e) =>{
        setPhoneNum(e.target.value);
        console.log(e.target.value);
    };

    const sendingMembershipData = async() => {
        try {    
                const response = await axios.post('/user', {
                    "phoneNum": phoneNum,
                    "pw": password,
                    "name": name
                });
        
                console.log('Server response:', response.data);
                alert("회원가입이 완료하였습니다.");
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return (
        <div className="JoinMembership">
            <div className="Jtitle">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" />
            </div>
            <div className="enterMembershipInfo">
                <div className="enterID">
                    <label htmlFor="id">아이디</label>
                    <input
                        id = "id"
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={onIDChange}
                    >
                    </input>
                    <button>아이디 중복 확인</button>
                    <p></p>
                </div>
                <div className="inputBox">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id = "password"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={onPassWordChange}
                    >
                    </input>
                    <p style={{color: ispw === false ? "red" : "green", marginLeft:"8rem"}}>{pwMessage}</p>
                </div>
                <div className="inputBox">
                    <label htmlFor="checkPW">비밀번호 확인</label>
                    <input
                        id = "checkPW"
                        type="password"
                        placeholder="비밀번호를 다시 한 번 입력하세요"
                        value={checkPW}
                        onChange={onCheckPWChange}
                    />
                    <p style={{color: ischeckpw === false ? "red" : "green", marginLeft:"8rem"}}>{checkpwMessage}</p>
                </div>
                <div style={{marginBottom: "1rem"}}className="inputBox">
                    <label htmlFor="name">이름</label>
                    <input
                        id = "name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={onNameChange}
                    />
                </div>
                <div style={{marginBottom: "1rem"}} className="enterPhoneNum">
                    <label>휴대폰 번호</label>
                    <input
                        id="phoneNum"
                        placeholder="010-1234-5678의 형태로 입력해주세요"
                        value={phoneNum}
                        onChange={onPhoneNumChange}
                    />
                    <button>인증번호 받기</button><br/>
                    <input
                        id="inputCheckNum"
                        placeholder="인증 번호를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
            </div>
            <button className="joinbtn" onClick={sendingMembershipData}>가입하기</button>
        </div>
    );
}
export default JoinMembership