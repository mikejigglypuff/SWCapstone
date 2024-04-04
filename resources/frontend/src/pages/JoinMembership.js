import React from "react";
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import joinMembershipStyled from "../css/joinmembership.module.css"

const JoinMembership = () => {
    const [id, setID] = useState("");
    const [password, setPassword]= useState("");
    const [checkPW, setCheckPw] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vertifyCode, setVertifyCode] = useState("");

    const [pwMessage, setPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");

    const [ispw, setIsPw] = useState(false);
    const [ischeckpw, setIsCheckPw] = useState(false);
    const [isemail, setIsEmail] = useState(false);
    const [Overlap, setOverlap] = useState([]);

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

    // 이메일 유효성 검사 부분
    const onEmailChange = (e) =>{
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if(!emailRegEx.test(currentEmail)){
            setEmailMessage("올바른 이메일 형식이 아닙니다.");
            setIsEmail(false);
        }// 이메일 조건식과 입력한 값이 일치하지 않은 경우
        else{
            setEmailMessage("올바른 이메일 형식을 사용하였습니다");
            setIsEmail(true);
        }// 이메일 조건식과 입력한 값이 일치한 경우
    };

    const onNameChange = (e) =>{
        setName(e.target.value);
        console.log(e.target.value);
    };
    
    const navigate = useNavigate();

    //이메일 인증번호 받는 부분
    const checkEmailVertical = async() => {
        try {    
                const response = await axios.post('https://www.healthintalk.net/emailAuth', {
                    "email": email
                });
                console.log(response);
                const emailToken = response.data;
                if (emailToken){
                    localStorage.removeItem('email-token');
                    localStorage.setItem('email-token', emailToken);
                    console.log(emailToken);   
                }// 이메일 토큰 저장하는 부분
                alert("입력한 이메일에서 인증번호를 받아와주세요")

          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    const onVertifyCode = (e) => {
        setVertifyCode(e.target.value);
        console.log(e.target.value);
    }

    // 입력한 회원 정보 전달 부분
    const sendingMembershipData = async() => {
        const ivertifyCode = parseInt(vertifyCode);
        try {
                if (Overlap.isOverlap === true){
                    alert("중복된 아이디를 사용하였습니다");
                    return;
                }
                else if (ispw === false){
                    alert("비밀번호 조건이 일치하지 않습니다");
                    return;
                }
                else if (ischeckpw === false){
                    alert("비밀번호와 비밀번호 확인의 비밀번호가 일치하지 않습니다.");
                    return;
                }   
                else if (isemail === false){
                    alert("이메일 양식이 일치하지 않습니다");
                    return;
                }

                const emailToken = localStorage.getItem('email-token');

                const response = await axios.post('https://www.healthintalk.net/user', 
                {
                    "id": id,
                    "pw": password,
                    "name": name,
                    "verifyCode": ivertifyCode
                },
                {
                    headers: {
                        authorization : `${emailToken}`
                    }
                });

                alert("회원가입이 완료하였습니다.");
                localStorage.removeItem('email-token');
                navigate('/login');

          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    // 아이디 중복확인 부분
    const checkIDOverlap = async() => {
        try {    
                const response = await axios.get(`https://www.healthintalk.net/user/${id}`);
                setOverlap(response.data);
                console.log(response);

          } catch (error) {
            console.error('아이디 중복 여부 정보를 가져오는 도중 에러 발생', error);
          }
    };

    return (
        <div className={joinMembershipStyled.JoinMembership}>
            <div className={joinMembershipStyled.Jtitle}>
                <img src="/static/img/logo.png"/>
            </div>
            <div className={joinMembershipStyled.enterMembershipInfo}>
                <div className={joinMembershipStyled.enterID}>
                    <label htmlFor="id">아이디</label>
                    <input
                        id = {joinMembershipStyled.id}
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={onIDChange}
                    >
                    </input>
                    <button onClick={checkIDOverlap}>아이디 중복 확인</button>
                    {Overlap.isOverlap === true ? <p style={{color:"red"}}>아이디가 중복되었습니다</p> : <p style={{color:"green"}}>아이디를 사용할 수 있습니다.</p>}
                </div>
                <div className={joinMembershipStyled.inputBox}>
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
                <div className={joinMembershipStyled.inputBox}>
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
                <div style={{marginBottom: "1rem"}}className={joinMembershipStyled.inputBox}>
                    <label htmlFor="name">이름</label>
                    <input
                        id = "name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={onNameChange}
                    />
                </div>
                <div style={{marginBottom: "1rem"}} className={joinMembershipStyled.enterPhoneNum}>
                    <label htmlFor="email">이메일</label>
                    <input
                        id={joinMembershipStyled.email}
                        placeholder="sample@sample.com의 형태로 입력하세요"
                        value={email}
                        onChange={onEmailChange}
                    />
                    <button onClick={checkEmailVertical}>인증번호 받기</button><br/>
                    <p style={{color: isemail === false ? "red" : "green", marginLeft:"8rem"}}>{emailMessage}</p>
                    <input
                        id={joinMembershipStyled.inputCheckNum}
                        placeholder="인증 번호를 입력하세요"
                        value={vertifyCode}
                        onChange={onVertifyCode}
                    />
                </div>
            </div>
            <button className={joinMembershipStyled.joinbtn} onClick={sendingMembershipData}>가입하기</button>
        </div>
    );
}
export default JoinMembership