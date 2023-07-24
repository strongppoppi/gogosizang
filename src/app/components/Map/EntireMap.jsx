"use client";
import { useEffect } from "react";

export default function EntireMap({ setNaverMap, setMyCurrentLocation }) {
  useEffect(() => {
    let mapRef = null;
    let myLocation = "";

    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        myLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // 현재 위치 추적
        let currentPosition = [myLocation.latitude, myLocation.longitude];

        // Naver Map 생성
        mapRef = new naver.maps.Map("map", {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          zoomControl: false,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          logoControlOptions: {
            position: naver.maps.Position.TOP_LEFT,
          },
        });
        setMyCurrentLocation(currentPosition);
        setNaverMap(mapRef);
      });
    } else {
      window.alert("현재 위치를 알 수 없어 기본 위치로 지정합니다.");
      myLocation = { latitude: 37.4862618, longitude: 127.1222903 };

      // 현재 위치 추적
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      setMyCurrentLocation(currentPosition);

      // Naver Map 생성
      mapRef = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: false,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      });
      setNaverMap(mapRef);
    }
  }, [setNaverMap]);

  return <div id="map" className="w-full h-full"></div>;
}
