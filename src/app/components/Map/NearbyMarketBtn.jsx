"use client";

import Image from "next/image";

import marketicon from "/public/icons/market_white.png";

export default function NearbyMarketBtn({
  naverMap,
  markers,
  myCurrentLocation,
}) {
  let currentLatitude = myCurrentLocation.latitude;
  let currentLongitude = myCurrentLocation.longitude;

  // 함수: 두 좌표 간 거리 구하기
  const getDistance = (lat1, lon1, lat2, lon2) => {
    let x = lat2 - lat1;
    let y = lon2 - lon1;
    return Math.sqrt(x * x + y * y);
  };

  // 함수: 가장 가까운 마커 찾기
  const findNearestMarker = (markers, currentLatitude, currentLongitude) => {
    var nearestMarker = markers[0];
    var minDistance = Number.MAX_VALUE;

    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      var markerLatitude = marker.position.y;
      var markerLongitude = marker.position.x;

      var distance = getDistance(
        currentLatitude,
        currentLongitude,
        markerLatitude,
        markerLongitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestMarker = marker;
      }
    }

    return nearestMarker;
  };

  // 버튼 클릭 시
  const handleButton = async () => {
    var nearestMarker = await findNearestMarker(
      markers,
      currentLatitude,
      currentLongitude
    );
    console.log("가장 가까운 시장 마커: ", nearestMarker);
    if (naverMap) {
      var newCenter = new naver.maps.LatLng(
        nearestMarker.position.y,
        nearestMarker.position.x
      );

      naverMap.setCenter(newCenter);
    }
  };

  return (
    <button
      onClick={handleButton}
      className="w-36 h-12 rounded-lg shadow-md bg-black flex justify-center items-center"
    >
      <div className="flex flex-row">
        <Image src={marketicon} alt="아이콘" width={24} height={24} />
        <div className="text-md font-medium text-white ml-2 mr-1">
          가까운 시장
        </div>
      </div>
    </button>
  );
}
