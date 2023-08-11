"use client";
import { useEffect, useState } from "react";

import EntireMap from "../components/Map/EntireMap";
import EntireMarketMarker from "../components/Map/EntireMarketMarker";
import MarketModal from "../components/Map/MarketModal";
import MyLocationBtn from "../components/Map/MyLocationBtn";
import NearbyMarketBtn from "../components/Map/NearbyMarketBtn";
import SearchBar from "../components/Map/SearchBar";
import SearchResultModal from "../components/Map/SearchResultModal";

export default function MapPage() {
  const [naverMap, setNaverMap] = useState(null); //네이버 지도 instance(?)
  const [markers, setMarkers] = useState({}); //현재 naverMap에 추가된 marker들
  const [selectedMarket, setSelectedMarket] = useState(null); //선택된 시장(마커)의 key(index)
  const [beforeMarket, setBeforeMarket] = useState(null);
  const [myCurrentLocation, setMyCurrentLocation] = useState([]); // 내 위치 정보 불러오기
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  
  useEffect(() => {
    if (selectedMarket && selectedMarket != beforeMarket) {

      // 선택한 마커 검은색으로
      if (beforeMarket) {
        markers[beforeMarket].setIcon({
          content: "<img src='icons/marker_main.svg' width='31.5' height='39' alt='시장 마커' class='min-w-[31.5px] min-h-[39px] overflow-hidden' />",
          size: new naver.maps.Size(31.5, 39),
          origin: new naver.maps.Point(15.75, 0),
        });
      }

      markers[selectedMarket].setIcon({
        content: "<img src='icons/marker_black.svg' width='31.5' height='39' alt='시장 마커' class='overflow-hidden' />",
        size: new naver.maps.Size(31.5, 39),
        origin: new naver.maps.Point(15.75, 0),
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
