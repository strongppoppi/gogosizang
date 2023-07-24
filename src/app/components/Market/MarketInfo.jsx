"use client"

import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../../firebase-config";
import { ref, get } from "firebase/database";
import Image from "next/image";

import markerIcon from "/public/icons/marker_grey.png";
import computerIcon from "/public/icons/computer.svg";
import phoneIcon from "/public/icons/phonecall.svg";
import clockIcon from "/public/icons/clock.svg";
import carIcon from "/public/icons/car.svg";
import chevronDown from "/public/icons/chevron_down_small.svg";


export default function MarketInfo({ marketKey }) {
    const [marketApiData, setMarketApiData] = useState(null);

    const apiDataRef = ref(firebaseDatabase, `market_api/${marketKey}`);

    useEffect(() => {
        if (!marketApiData) {
            get(apiDataRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setMarketApiData(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    // 파베에서 불러오거나 따로 구해야 하는 데이터
    var subwayLine = 0;
    var station = "지하철역";
    var stationsDistance = "0m";
    var openTime = "00:00";
    var closeTime = "00:00";
    var freeParking = true;

    // 홈페이지 주소 url 유효성 검사
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

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
            {marketApiData ?
                <div className="w-11/12">
                    <h1 className="text-2xl font-bold text-black mb-3">{marketApiData.mrktNm}</h1>
                    <div className="flex flex-row items-center mb-2">
                        <Image src={markerIcon} alt="아이콘" width={24} height={24} />
                        <h4 className="text-base font-normal text-black ml-0.5">{marketApiData.rdnmadr}</h4>
                    </div>
                    <div className="flex flex-row items-center mb-5">
                        <div className="rounded-full px-2 py-0.5 bg-main text-sm font-normal text-white ml-6">
                            {`${subwayLine}호선`}
                        </div>
                        <h4 className="text-sm font-normal text-gray-700 ml-1">{`${station}(으)로부터 ${stationsDistance}`}</h4>
                    </div>
                    <div className="w-full h-14 mb-4 flex flex-row border-y border-solid border-gray-200">
                        {isValidURL(marketApiData.homepageUrl) ?
                            <a href={marketApiData.homepageUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex justify-center items-center">
                                <div className="flex-1 flex flex-col justify-center items-center py-1">
                                    <Image src={computerIcon} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-sm font-normal text-black">홈페이지</h3>
                                </div>
                            </a> :
                            <div className="flex-1 flex flex-col justify-center items-center py-1" style={{ opacity: 0.5 }}>
                                <Image src={computerIcon} width={24} height={24} alt="아이콘" />
                                <h3 className="text-sm font-normal text-black">홈페이지</h3>
                            </div>}
                        <div className="w-px h-full bg-gray-200" />
                        {marketApiData.phoneNumber !== "" ?
                            <a href={`tel:${marketApiData.phoneNumber}`} className="flex-1 flex justify-center items-center">
                                <div className="flex-1 flex flex-col justify-center items-center py-1">
                                    <Image src={phoneIcon} width={24} height={24} alt="아이콘" />
                                    <h3 className="text-sm font-normal text-black">전화</h3>
                                </div>
                            </a> :
                            <div className="flex-1 flex flex-col justify-center items-center py-1" style={{ opacity: 0.5 }}>
                                <Image src={phoneIcon} width={24} height={24} alt="아이콘" />
                                <h3 className="text-sm font-normal text-black">전화</h3>
                            </div>}
                    </div>
                    <div className="h-12 flex flex-row items-center px-3 rounded-lg bg-gray-100 mb-3">
                        <Image src={clockIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-base font-normal text-black ml-2.5">영업 시간</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-base font-normal text-black mr-1">{`${openTime} - ${closeTime}`}</h3>
                        <Image src={chevronDown} width={24} height={24} alt="아이콘" />
                        <div className="grow" />
                        <div className="rounded px-2.5 py-1 bg-positive text-sm font-normal text-white">영업중</div>
                    </div>
                    <div className="h-12 flex flex-row items-center px-3 rounded-lg bg-gray-100 mb-6">
                        <Image src={carIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-base font-normal text-black ml-2.5">주차장</h3>
                        <div className="w-px h-6 bg-gray-400 mx-3" />
                        <h3 className="text-base font-normal text-black mr-1">{marketApiData.prkplceYn === "Y" ? "있음" : "없음"}</h3>
                    </div>
                </div> :
                skeleton}
        </>
    )
}