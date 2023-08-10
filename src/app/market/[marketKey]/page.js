"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import MarketMap from "@/app/components/Market/MarketMap";
import Drawer from "@/app/components/common/Drawer";
import MarketImage from "@/app/components/Market/MarketImage";
import MarketInfo from "@/app/components/Market/MarketInfo";
import InfoTab from "@/app/components/Market/InfoTab";
import StoreImage from "@/app/components/Store/StoreImage";
import StoreInfo from "@/app/components/Store/StoreInfo";
import ReviewList from "@/app/components/Store/ReviewList";
import ReviewModal from "@/app/components/Store/ReviewModal";
import ReviewPrompt from "@/app/components/Store/ReviewPrompt";
import StoreMarker from "@/app/components/Market/StoreMarker";

import backIcon from "public/icons/arrow_left_black.png";
import cancelIcon from "public/icons/x_black.png";
import locationIcon from "public/icons/gps_white.png";
import yeongcheonStores from "public/data/yeongcheonData.json";

const iconPath = {
    "고기": "/icons/meat.png",
    "야채·과일": "/icons/apple.png",
    "떡": "/icons/tteok.png",
    "치킨": "/icons/chicken.png",
    "생선": "/icons/fish.png",
    "만두": "/icons/dumpling.png",
    "화장품": "/icons/cosmetics.png",
    "옷": "/icons/cloths.png",
    "식당": "/icons/restaurant.png",
    "반찬": "/icons/egg.png",
    "약국": "/icons/medicine.png",
    "핫도그": "/icons/hotdog.png",
    "사진관": "/icons/camera.png",
    "빵": "/icons/bread.png",
    "전": "/icons/jeon.png",
    "애견용품": "/icons/dog.png",
    "신발": "/icons/shoes.png",
    "약재": "/icons/insam.png",
    "분식": "/icons/tteokbokki.png",
    "이불": "/icons/blanket.png",
    "잡곡": "/icons/rice.png",
    "기타": "",
}


export default function MarketPage({ params }) {
  var marketKey = params.marketKey;
  const [naverMap, setNaverMap] = useState(null);
  const [storeMarkers, setStoreMarkers] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (selectedStore) {  // 상점 선택 -> 지도에 모든 상점 마커 추가
      for (const [key, marker] of Object.entries(storeMarkers)) {
        if (key == selectedStore) { // 선택한 상점 마커 (black)
          marker.setIcon({
            content: [
              '<div class="w-max h-[30px] bg-black rounded-lg flex flex-row items-center px-[7px]" shadow overflow-hidden>',
              `<img src='${iconPath[yeongcheonStores[key]["분류"]]}' width='20' height='20' alt="상점 아이콘" />`,
              `<span class="text-[13px] text-white font-normal whitespace-pre break-keep ml-1">${yeongcheonStores[key]["점포명"]}</span>`,
              '</div>',
            ].join(''),
          })
        } else {  // 선택하지 않은 상점 마커 (white)
          marker.setIcon({
            content: [
              '<div class="w-max h-[30px] bg-white rounded-lg border border-gray-300 flex flex-row items-center px-[7px]" shadow overflow-hidden>',
              `<img src='${iconPath[yeongcheonStores[key]["분류"]]}' width='20' height='20' alt="상점 아이콘" />`,
              `<span class="text-[13px] text-black font-normal whitespace-pre break-keep ml-1">${yeongcheonStores[key]["점포명"]}</span>`,
              '</div>',
            ].join(''),
          })
        }
        marker.setMap(naverMap);  
      }
    } else {  // 상점 선택 해제 -> 지도에서 상점 마커 삭제
      for (const [key, marker] of Object.entries(storeMarkers)) {
        marker.setMap(null);
      }
    }
  }, [storeMarkers, selectedStore]);

  // const setMyLocation = () => {
  //   console.log("현재 내 위치로 이동");
  // };

  return (
    <div className="h-full flex-col grow relative overflow-y-scroll">
      {showReviewModal && <ReviewModal marketKey={marketKey} storeKey={selectedStore} setShowReviewModal={setShowReviewModal}/>}
      <Drawer>
        {selectedStore ? 
          <>
            <StoreImage marketKey={marketKey} storeKey={selectedStore}/>
            <StoreInfo marketKey={marketKey} storeKey={selectedStore}/>
            <ReviewPrompt setShowReviewModal={setShowReviewModal}/>
            <ReviewList marketKey={marketKey} storeKey={selectedStore}/>
          </> :
          <>
            <MarketImage marketKey={marketKey} />
            <MarketInfo marketKey={marketKey} />
            <InfoTab marketKey={marketKey} setSelectedStore={setSelectedStore}/>
          </>
        }
      </Drawer>
      <MarketMap setNaverMap={setNaverMap} marketKey={marketKey} selectedStore={selectedStore}/>
      {selectedStore && Object.entries(storeMarkers).length === 0 && (
        <StoreMarker
          naverMap={naverMap}
          markers={storeMarkers}
          setMarkers={setStoreMarkers}
          setSelectedStore={setSelectedStore}
        />
      )}
      <Link href="/map">
        <div className="absolute top-5 left-5 w-11 h-11 rounded-lg bg-white shadow-md flex justify-center items-center">
          <Image src={backIcon} width={24} height={24} alt="아이콘" />
        </div>
      </Link>
      {selectedStore && 
        <div 
          onClick={() => setSelectedStore(null)}
          className="absolute top-5 right-5 w-11 h-11 rounded-lg bg-white shadow-md flex justify-center items-center">
          <Image src={cancelIcon} width={24} height={24} alt="아이콘" />
        </div>}
      {/* <div 
        onClick={setMyLocation}
        className="absolute bottom-12 right-5 w-11 h-11 rounded-lg bg-black shadow-md flex justify-center items-center">
        <Image src={locationIcon} width={24} height={24} alt="아이콘" />
      </div> */}
    </div>
  );
}
