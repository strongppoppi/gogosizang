"use client";
import { useEffect, useState } from "react";

import EntireMap from "../components/Map/EntireMap";
import EntireMarketMarker from "../components/Map/EntireMarketMarker";
import MarketModal from "../components/Map/MarketModal";
import MyLocationBtn from "../components/Map/MyLocationBtn";
import NearbyMarketBtn from "../components/Map/NearbyMarketBtn";
import SearchBar from "../components/Map/SearchBar";
import SearchResultModal from "../components/Map/SearchResultModal";

import yeongcheonData from "/public/data/영천시장.json";

export default function MapPage() {
  const [naverMap, setNaverMap] = useState(null); //네이버 지도 instance(?)
  const [markers, setMarkers] = useState({}); //현재 naverMap에 추가된 marker들
  const [selectedMarket, setSelectedMarket] = useState(null); //선택된 시장(마커)의 key(index)
  const [beforeMarket, setBeforeMarket] = useState(null);
  const [myCurrentLocation, setMyCurrentLocation] = useState([]); // 내 위치 정보 불러오기
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);

  //영천시장.json 데이터 수정용 코드
  // useEffect(() => {
  //   var newData = [];
  //   yeongcheonData.forEach(store => {
  //     newData.push({
  //       "연번": store["연번"],
  //       "건물번호": store["건물번호"],
  //       "주소": store["주소"],
  //       "점포명": store["점포명"],
  //       "대표자": store["대표자"],
  //       "사업자등록번호": store["사업자등록번호"],
  //       "연락처": store["연락처"],
  //       "온누리": store["온누리"],
  //       "제로페이가맹": store["제로페이가맹"],
  //       "쿠팡가입점포": store["쿠팡가입점포"],
  //       "놀장가입점포": store["놀장가입점포"],
  //       "판매상품": store["판매상품"],
  //       "취급품목": store["취급품목"],
  //       "분류": store["분류"]
  //     })
  //   });
  //   //console.log(newData);
  // });

  useEffect(() => {
    if (selectedMarket && selectedMarket != beforeMarket) {

      // 선택한 마커 검은색으로
      if (beforeMarket) {
        markers[beforeMarket].setIcon({
          url: "icons/marker_main.png",
          size: new naver.maps.Size(42, 52),
          origin: new naver.maps.Point(0, 0),
        });
      }

      markers[selectedMarket].setIcon({
        url: "icons/marker_black.png",
        size: new naver.maps.Size(42, 52),
        origin: new naver.maps.Point(0, 0),
      });

      // 선택한 마커 위치로 이동
      var newCenter = markers[selectedMarket].getPosition();
      naverMap.panTo(newCenter);

      setBeforeMarket(selectedMarket);
    }
  }, [selectedMarket]);

  const toggleSearchBar = () => {
    setIsSearchBarClicked(!isSearchBarClicked);
  };

  return (
    <div className="flex-col grow">
      <EntireMap
        setNaverMap={setNaverMap}
        setMyCurrentLocation={setMyCurrentLocation}
      />
      {Object.entries(markers).length === 0 && (
        <EntireMarketMarker
          naverMap={naverMap}
          markers={markers}
          setMarkers={setMarkers}
          setSelectedMarket={setSelectedMarket}
        />
      )}
      <SearchBar
        isSearchBarClicked={isSearchBarClicked}
        toggleSearchBar={toggleSearchBar}
      />
      {isSearchBarClicked ? (
        <SearchResultModal
          toggleSearchBar={toggleSearchBar}
          setSelectedMarket={setSelectedMarket}
          naverMap={naverMap}
        />
      ) : (
        <>
          <MarketModal marketKey={selectedMarket} />
          <NearbyMarketBtn
              naverMap={naverMap}
              markers={markers}
              myCurrentLocation={myCurrentLocation}
              setSelectedMarket={setSelectedMarket}
            />
            <MyLocationBtn
              naverMap={naverMap}
              setMyCurrentLocation={setMyCurrentLocation}
            />
        </>
      )}
    </div>
  );
}
