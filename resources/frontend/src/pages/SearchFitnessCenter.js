import React from "react";
import "../css/searchfitnesscenter.css"

const SearchFitnessCenter = () => {
    return (
        <div className="SearchFitnessCenter">
            <div className="SFCtitle">
                <h2>🦾주변 헬스장 검색하기</h2>
            </div>
            <div className="enterplace">
                <label htmlFor="place">원하는 장소를 입력하세요</label>
                <input
                    id="place"
                    placeholder="~ 근처 헬스장이라 입력하세요"
                    // value={}
                    // onChange={}
                />
                <button>🔍검색</button>
            </div>
            <div className="showmap">
                <h2>카카오맵 들어갈 자리</h2>
            </div>
        </div>
    );
}
export default SearchFitnessCenter