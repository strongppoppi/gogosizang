"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";
import markerIcon from "/public/icons/marker_grey.png";
import computerIcon from "/public/icons/computer.svg";
import phoneIcon from "/public/icons/phonecall.svg";
import clockIcon from "/public/icons/clock.svg";
import carIcon from "/public/icons/car.svg";
import chevronDown from "/public/icons/chevron_down_small.svg";


export default function MarketInfo({ marketIndex }) {
    const [marketData, setMarketData] = useState(null);

    var marketName = "독립문 영천 시장";
    var marketAddress = "서울 서대문구 통일로 189-1 영천시장";
    var subwayLine = 5;
    var station = "서대문역";
    var stationsDistance = "641m";
    var openTime = "08:00";
    var closeTime = "21:00";
    var freeParking = true;

    return (
        <div className="w-90">
            <>
                <div className="w-full h-40 rounded-xl flex justify-center items-center overflow-hidden mb-4">
                    <Image
                        src={defaultImage}
                        alt="시장 이미지"
                        width={350}
                    />
                </div>
                <h1 className="text-2xl font-bold text-black mb-3">{marketName}</h1>
                <div className="flex flex-row items-center mb-2">
                    <Image src={markerIcon} alt="아이콘" width={24} height={24} />
                    <h4 className="text-base font-normal text-black ml-0.5">{marketAddress}</h4>
                </div>
                <div className="flex flex-row items-center mb-5">
                    <div className="rounded-full px-2 py-0.5 bg-main text-sm font-normal text-white ml-6">
                        {`${subwayLine}호선`}
                    </div>
                    <h4 className="text-sm font-normal text-gray-700 ml-1">{`${station}(으)로부터 ${stationsDistance}`}</h4>
                </div>
                <div className="w-full h-14 mb-4 flex flex-row border-y border-solid border-gray-200">
                    <div className="flex-1 flex flex-col justify-center items-center py-1">
                        <Image src={computerIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-sm font-normal text-black">홈페이지</h3>
                    </div>
                    <div className="w-px h-full bg-gray-200" />
                    <div className="flex-1 flex flex-col justify-center items-center py-1">
                        <Image src={phoneIcon} width={24} height={24} alt="아이콘" />
                        <h3 className="text-sm font-normal text-black">전화</h3>
                    </div>
                </div>
                <div className="flex flex-row items-center p-3 rounded-lg bg-gray-100 mb-3">
                    <Image src={clockIcon} width={24} height={24} alt="아이콘" />
                    <h3 className="text-base font-normal text-black ml-2.5">영업 시간</h3>
                    <div className="w-px h-6 bg-gray-400 mx-3" />
                    <h3 className="text-base font-normal text-black mr-1">{`${openTime} - ${closeTime}`}</h3>
                    <Image src={chevronDown} width={24} height={24} alt="아이콘" />
                    <div className="grow" />
                    <div className="rounded px-2.5 py-1 bg-positive text-sm font-normal text-white">영업중</div>
                </div>
                <div className="flex flex-row items-center p-3 rounded-lg bg-gray-100">
                    <Image src={carIcon} width={24} height={24} alt="아이콘" />
                    <h3 className="text-base font-normal text-black ml-2.5">주차장</h3>
                    <div className="w-px h-6 bg-gray-400 mx-3" />
                    <h3 className="text-base font-normal text-black mr-1">{freeParking ? "무료" : "유료"}</h3>
                </div>
            </>
        </div>
    )
}