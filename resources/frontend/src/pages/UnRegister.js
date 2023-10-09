import React from "react";
import Sidebar from "../components/Sidebar";
import unregisterStyled from "../css/unregister.module.css";

const UnRegister = () => {
    return(
        <div className={unregisterStyled.Unregister}>
            <Sidebar />
            <div className={unregisterStyled.unregisterArea}>
                <div className={unregisterStyled.URtitle}>
                    <img src="img/logo.png" />
                    <p>회원탈퇴</p>
                </div>
                <div className={unregisterStyled.inputPassword}>
                    <label htmlFor="password">비밀번호 입력</label>
                    <input
                        id = "password"
                        type="password"
                        placeholder="회원 탈퇴를 위한 비밀번호를 입력하세요"
                        // value={}
                        // onChange={}
                    >
                    </input>
                </div>
                <div className={unregisterStyled.btnArea}>
                    <button>회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
}
export default UnRegister