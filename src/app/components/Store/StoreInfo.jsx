"use client"

import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, get } from "firebase/database";
import Image from "next/image";

import marketIcon from "/public/icons/market_main.png";
import markerIcon from "/public/icons/marker_grey.png";
import phoneIconBlack from "/public/icons/phone_black.svg";
import phoneIconGrey from "/public/icons/phone_grey.svg";
import giftcardIcon from "/public/icons/giftcard_grey.png";

import yeongcheonData from "/public/data/yeongcheonData.json";
import { findNearestStation } from "@/app/constants/station";


export default function StoreInfo({ marketKey, storeKey }) {
    const [storeData, setStoreData] = useState(null);
    const [giftcard, setGiftcard] = useState([]);

    const storeRef = ref(firebaseDatabase, `stores/${marketKey}/${storeKey}`);

    const nearestStation = findNearestStation(yeongcheonData[storeKey]["위도"], yeongcheonData[storeKey]["경도"]);

    useEffect(() => {
        get(storeRef).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setStoreData(data);
                var newList = [];
                if (data["제로페이가맹"] == 1) newList.push("제로페이");
                if (data["온누리"] == 1) newList.push("온누리상품권");
                setGiftcard(newList);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [storeKey]);

    // 파베에서 불러오거나 따로 구해야 하는 데이터
    var subwayLine = 0;
    var station = "지하철역";
    var stationsDistance = "0m";

    // 로딩 중 보여질 UI
    var skeleton = (
        <div className="w-11/12">
            <div className="w-40 h-8 rounded-lg bg-gray-100 mb-3" />
            <div className="w-80 h-6 rounded-lg bg-gray-100 mb-2" />
            <div className="w-64 h-6 rounded-lg bg-gray-100 mb-5" />
            <div className="w-full h-14 mb-4 flex flex-row justify-center border-y border-solid border-gray-200">
                <div className="w-px h-full bg-gray-200" />
            </div>
            <div className="h-12 flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-3" />
            <div className="h-12 flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-6" />
        </div>
    );

    return (
        <>
            {storeData ?
                <div className="w-11/12">
                    <div className="flex flex-row items-center space-x-1 mb-3">
                        <Image src={marketIcon} width={24} height={24} alt="아이콘" />
                        <h1 className="text-[25px] font-bold text-black">{storeData["점포명"]}</h1>
                        <h5 className="text-[13px] font-normal text-gray-600">{storeData["취급품목"]}</h5>
                    </div>
                    {storeData["주소"] &&
                        <div className="flex flex-row items-center mb-2">
                            <Image src={markerIcon} alt="아이콘" width={24} height={24} />
                            <h4 className="text-[15px] font-normal text-black ml-0.5">{storeData["주소"]}</h4>
                        </div>}
                    <div className="flex flex-row items-center mb-5">
                        <div className="rounded-full px-2 py-0.5 text-[13px] font-normal text-white ml-6" style={{ backgroundColor: nearestStation.color }}>
                            {nearestStation.line}
                        </div>
                        <h4 className="text-[13px] font-normal text-gray-700 ml-1">{`${nearestStation.name}역으로부터 ${nearestStation.distance.toFixed(0)}m`}</h4>
                    </div>
                    <div className="w-full h-14 mb-4 flex flex-row border-y border-solid border-gray-200">
                        {storeData.phoneNumber !== "" ?
                            <a href={`tel:${storeData.phoneNumber}`} className="flex-1 flex justify-center items-center">
                                <div className="w-full flex flex-col justify-center items-center pt-1">
                                    <Image src={phoneIconBlack} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-13px] font-normal text-black">전화</h3>
                                </div>
                            </a> :
                            <div className="w-full flex flex-col justify-center items-center pt-1.5">
                                <Image src={phoneIconGrey} width={24} height={24} alt="아이콘" />
                                <h3 className="text-13px] font-normal text-gray-300">전화</h3>
                            </div>}
                    </div>
                    <div className="h-12 flex flex-row items-center px-3 rounded-lg bg-gray-100 mb-4">
                        <Image src={giftcardIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-[15px] font-normal text-black ml-2.5">상품권</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-[15px] font-normal text-black mr-1">{giftcard.length == 0 ? "-" : giftcard.join(" · ")}</h3>
                    </div>
                </div> :
                skeleton}
        </>
    )
}