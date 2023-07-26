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

import backIcon from "public/icons/arrow_left_black.png";
import cancelIcon from "public/icons/x_black.png";
import locationIcon from "public/icons/gps_white.png";



export default function MarketPage({ params }) {
  var marketKey = params.marketKey;
  const [naverMap, setNaverMap] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    // 상점 선택 시 마커 색상 변경 & 지도 위치 이동
  }, [selectedStore]);

  const setMyLocation = () => {
    console.log("현재 내 위치로 이동");
  };

  return (
    <div className="h-full flex-col grow relative overflow-y-scroll">
      <Drawer>
        {selectedStore ? 
          <>
            <StoreImage marketKey={marketKey} storeKey={selectedStore}/>
            <StoreInfo marketKey={marketKey} storeKey={selectedStore}/>
            <ReviewList marketKey={marketKey} storeKey={selectedStore}/>
          </> :
          <>
            <MarketImage marketKey={marketKey} />
            <MarketInfo marketKey={marketKey} />
            <InfoTab marketKey={marketKey} setSelectedStore={setSelectedStore}/>
          </>
        }
      </Drawer>
      <MarketMap setNaverMap={setNaverMap} marketKey={marketKey}/>
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
      <div 
        onClick={setMyLocation}
        className="absolute bottom-12 right-5 w-11 h-11 rounded-lg bg-black shadow-md flex justify-center items-center">
        <Image src={locationIcon} width={24} height={24} alt="아이콘" />
      </div>
    </div>
  );
}
