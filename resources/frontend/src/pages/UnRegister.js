import React from "react";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import unregisterStyled from "../css/unregister.module.css";

const UnRegister = () => {

    const [pw, setPw] = useState("");

    const onPWChange = (e) => {
        setPw(e.target.value);
    }

    const sendPWforUnregister = async() => {
        try{
            const response = await axios.patch('https://healthintalk.duckdns.org/user/deleteUser', {
                "pw": pw
            });
            alert("회원탈퇴가 완료되었습니다");
        }catch(error){
            console.error("좋아요 버튼 처리 도중 에러 발생", error);
        }
    }

    return(
        <div className={unregisterStyled.Unregister}>
            <Sidebar />
            <div className={unregisterStyled.unregisterArea}>
                <div className={unregisterStyled.URtitle}>
                    <img src="/static/img/logo.png" />
                    <p>회원탈퇴</p>
                </div>
                <div className={unregisterStyled.inputPassword}>
                    <label htmlFor="password">비밀번호 입력</label>
                    <input
                        id = "password"
                        type="password"
                        placeholder="회원 탈퇴를 위한 비밀번호를 입력하세요"
                        value={pw}
                        onChange={onPWChange}
                    >
                    </input>
                </div>
                <div className={unregisterStyled.btnArea}>
                    <button onClick={sendPWforUnregister}>회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
}
export default UnRegister