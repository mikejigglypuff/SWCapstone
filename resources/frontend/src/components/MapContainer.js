import React from "react";
import { useEffect, useState } from "react";

const MapContainer = () => {

    const {kakao} = window;

    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.32206, 127.1269), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options);
    })

    return(
        <div id="map" style={{width:"80%",height:"80vh", marginBottom:"2rem"}}>

        </div>
    );
}
export default MapContainer