import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hearderStyled from "../css/header.module.css";

const Header = () => {
    const [isclick, setIsClick] = useState(false);
    const [islogined, setIsLogined] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData()
    },[]);

    const fetchUserData = async() => {
        try{
            const response = await axios.get('https://www.healthintalk.net/user');
            setUserData(response.data);
            console.log(response);
        }catch(error){
            console.error("보드 정보를 가져오는 도중 에러 발생", error);
        }
    };

    const navigate = useNavigate();

    //드롭다운을 위한 토글 함수
    const toggleDropdown = () => {
        setIsClick(!isclick);
    };


    const closeDropdown = () => {
        setIsClick(false);
    };

    const deleteSession = async () => {
        await axios.delete("https://healthintalk.net/logout");
        localStorage.removeItem('usersId');
        setUserData([]);
        navigate("/");
    }

    // useRef를 사용하여 드롭다운 메뉴를 가리키는 요소를 참조
    const dropdownRef = useRef(null);

    // useEffect를 사용하여 클릭 이벤트 리스너를 추가
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown();
            }
        };

        if(document.cookie) { 
            if(userData.length === 0) { 
                fetchUserData(); 
            }
        }

        // 페이지 어디에서든 클릭 이벤트를 감지하도록 이벤트 리스너 추가
        document.addEventListener("click", handleOutsideClick);

        return () => {
            // 컴포넌트가 언마운트되면 이벤트 리스너를 제거
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isclick]);

    return(
        <div className={hearderStyled.Header}>
            <Link to="/"><img src="/static/img/logo.png" /></Link>
            <nav className = {hearderStyled.menubar}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="board/자유게시판">자유게시판</Link></li>
                    <li><Link to="board/식단&운동공유게시판">식단&운동 공유 게시판</Link></li>
                    <li><Link to="/searchfitnesscenter">내 주변 헬스장 찾기</Link></li>
                    <li><Link to="board/질문게시판">질문게시판</Link></li>
                </ul>
            </nav>
            <div className={hearderStyled.dropdownContainer} ref={dropdownRef}>
                <button onClick={toggleDropdown}><img src="/static/img/loginimage.png" /></button>
                {isclick && (
                    <div className={hearderStyled.dropdownContent}>
                        <ul>
                            {document.cookie ? ( //쿠키 존재 여부 확인
                                    <>
                                        <li style={{textAlign:"center", fontWeight: "bold", color:"navy"}}>✨{userData.username}님 환영합니다✨</li>
                                        <li><Link to="/mypage" onClick={() => setIsClick(false)}>🏡 마이페이지</Link></li>
                                        <li><Link to="/logout" onClick={deleteSession}>🔓 로그아웃</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login" onClick={() => setIsClick(false)}>🔐 로그인</Link></li>
                                    </>
                                )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Header