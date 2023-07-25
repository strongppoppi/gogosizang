"use client";

import Image from "next/image";

import marketicon from "/public/icons/market_white.png";

export default function NearbyMarketBtn({
  naverMap,
  markers,
  myCurrentLocation,
  setSelectedMarket,
}) {
  let currentLatitude = myCurrentLocation[0];
  let currentLongitude = myCurrentLocation[1];

  // 함수: 두 좌표 간 거리 구하기
  const getDistance = (lat1, lon1, lat2, lon2) => {
    let x = lat2 - lat1;
    let y = lon2 - lon1;
    return Math.sqrt(x * x + y * y);
  };

  // 함수: 가장 가까운 마커 찾기
  const findNearestMarker = (markers, currentLatitude, currentLongitude) => {
    let nearestMarker = null;
    let nearestMarkerKey = null;
    let minDistance = Number.MAX_VALUE;

    for (const markerId in markers) {
      const marker = markers[markerId];
      const markerLatitude = marker.position.y;
      const markerLongitude = marker.position.x;

      const distance = getDistance(
        currentLatitude,
        currentLongitude,
        markerLatitude,
        markerLongitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestMarker = marker;
        nearestMarkerKey = markerId;
      }
    }

    return [nearestMarker, nearestMarkerKey];
  };

  // 버튼 클릭 시
  const handleButton = async () => {
    var marker = await findNearestMarker(
      markers,
      currentLatitude,
      currentLongitude
    );
    console.log("가장 가까운 시장 마커: ", marker);
    var nearestMarker = marker[0];
    var nearestMarkerKey = marker[1];

    if (naverMap) {
      var newCenter = new naver.maps.LatLng(
        nearestMarker.position.y,
        nearestMarker.position.x
      );
      naverMap.panTo(newCenter, { duration: 200, easing: "easeInCubic" });
      setSelectedMarket(nearestMarkerKey);
    }
  };

  return (
    <button
      onClick={handleButton}
      className="w-36 h-12 rounded-lg shadow-md bg-black flex justify-center items-center absolute bottom-[110px] left-5"
    >
      <div className="flex flex-row">
        <Image src={marketicon} alt="아이콘" width={24} height={24} />
        <div className="text-[17px] font-medium text-white ml-2 mr-1">
          가까운 시장
        </div>
      </div>
    </button>
  );
}
