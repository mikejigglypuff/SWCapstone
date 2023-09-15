import React from "react";
import "../css/joinmembership.css"

const JoinMembership = () => {
    return (
        <div className="JoinMembership">
            <div className="Jtitle">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" />
            </div>
            <div className="enterMembershipInfo">
                <div className="inputBox">
                    <label htmlFor="id">아이디</label>
                    <input
                        id = "id"
                        placeholder="아이디를 입력하세요"
                        // value={}
                        // onChange={}
                    >
                    </input>
                </div>
                <div className="inputBox">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id = "password"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        // value={}
                        // onChange={}
                    >
                    </input>
                </div>
                <div className="inputBox">
                    <label htmlFor="checkPW">비밀번호 확인</label>
                    <input
                        id = "checkPW"
                        placeholder="비밀번호를 다시 한 번 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="name">이름</label>
                    <input
                        id = "name"
                        placeholder="이름을 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="enterPhoneNum">
                    <label>휴대폰 번호</label>
                    <input
                        id="phoneNum"
                        placeholder="휴대폰 번호를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                    <button>인증번호 받기</button><br/>
                    <input
                        id="inputCheckNum"
                        placeholder="휴대폰 번호를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
            </div>
            <button className="joinbtn">가입하기</button>
        </div>
    );
}
export default JoinMembership