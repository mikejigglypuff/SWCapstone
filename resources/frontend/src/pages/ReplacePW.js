import React from "react";
import "../css/replacePW.css"

const ReplacePW = () => {
    return (
        <div className="ReplacePW">
            <div className="RPtitle">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" id="image" />
                <p id="title">비밀번호 변경</p>
            </div>
            <div className="enterNewPWArea">
                <div className="enterPW">
                    <label>현재 비밀번호</label>
                    <input
                        id="presentPW"
                        type="password"
                        placeholder="현재 비밀번호를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="enterNewPW">
                    <label>변경할 비밀번호</label>
                    <input
                        id="changePW"
                        type="password"
                        placeholder="변경할 비밀번호를 입력하세요"
                        // value={}
                        // onChange={}
                    />
                </div>
                <div className="RPbtnArea">
                    <button>비밀번호 변경</button>
                </div>
            </div>
        </div>
    );
}
export default ReplacePW