"use client";

import Image from "next/image";

import icon from "/public/icons/gps.png";

export default function MyLocationBtn({ naverMap, setMyCurrentLocation }) {
  let myLocation = "";

  const handleButton = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      myLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      let currentPosition = [myLocation.latitude, myLocation.longitude];
      var newCenter = new naver.maps.LatLng(
        currentPosition[0],
        currentPosition[1]
      );
      naverMap.panTo(newCenter, { duration: 200, easing: "easeInCubic" });

      console.log("현 위치: ", currentPosition);
      setMyCurrentLocation(currentPosition);
    });
  };

  return (
    <button
      onClick={() => handleButton()}
      className="w-12 h-12 rounded-lg shadow-md bg-white flex justify-center items-center absolute bottom-[110px] right-5"
    >
      <Image src={icon} width={24} height={24} alt="아이콘" />
    </button>
  );
}
