"use client";
import { useEffect, useState } from "react";

import EntireMap from "../components/Map/EntireMap";
import MarketModal from "../components/Map/MarketModal";
import MyLocationBtn from "../components/Map/MyLocationBtn";
import NearbyMarketBtn from "../components/Map/NearbyMarketBtn";
import SearchBar from "../components/Map/SearchBar";
import SearchResultModal from "../components/Map/SearchResultModal";

export default function MapPage() {
  const [naverMap, setNaverMap] = useState(null);   //네이버 지도 instance(?)
  const [markers, setMarkers] = useState({});     //현재 naverMap에 추가된 marker들
  const [selectedMarket, setSelectedMarket] = useState(null);   //선택된 시장(마커)의 key(index)
  const [beforeMarket, setBeforeMarket] = useState(null);
  const [myCurrentLocation, setMyCurrentLocation] = useState({}); // 내 위치 정보 불러오기
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);

  // 선택한 마커 검은색으로
  useEffect(()=> {
    if (selectedMarket) {
      
      if (beforeMarket) {
        markers[beforeMarket].setIcon({
          url: 'icons/marker_main.png',
          size: new naver.maps.Size(42, 52),
          origin: new naver.maps.Point(0, 0),
        });
      }

      markers[selectedMarket].setIcon({
          url: 'icons/marker_black.png',
          size: new naver.maps.Size(42, 52),
          origin: new naver.maps.Point(0, 0),
        });

      setBeforeMarket(selectedMarket);
    }
  }, [selectedMarket]);

  const toggleSearchBar = () => {
    setIsSearchBarClicked(!isSearchBarClicked);
  };

  return (
    <div className="flex-col grow">
      {isSearchBarClicked ? (
        <SearchResultModal toggleSearchBar={toggleSearchBar} />
      ) : (
        <EntireMap naverMap={naverMap} setNaverMap={setNaverMap} markers={markers} setMarkers={setMarkers} setSelectedMarket={setSelectedMarket}/>
      )}
      <SearchBar
        isSearchBarClicked={isSearchBarClicked}
        toggleSearchBar={toggleSearchBar}
      />
      {isSearchBarClicked ? null : (
        <div className="w-11/12 absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col">
          <MarketModal marketKey={selectedMarket} />
          <div className="flex flex-row justify-between mt-4">
            <NearbyMarketBtn />
            <MyLocationBtn />
          </div>
        </div>
      )}
    </div>
  );
}
