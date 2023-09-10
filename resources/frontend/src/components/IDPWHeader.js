import React from "react";
import "../css/findIDPW.css";

const IDPWHeader = () => {
    return (
        <div className="IDPWHeader">
            <a href="/">
                <img src="https://media.discordapp.net/attachments/1083261485498781763/1090877545580343406/image.png?width=510&height=213" id="logopic" /><br />
            </a>
            <div className="intro">
                <a href="../findID">아이디 찾기</a>
                <a href="../findPW">비밀번호 찾기</a>
            </div>
            <hr />
        </div>
    );
}

export default IDPWHeader;